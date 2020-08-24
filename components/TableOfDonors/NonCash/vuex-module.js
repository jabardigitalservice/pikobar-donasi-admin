import _cloneDeep from 'lodash/cloneDeep'
import { createBaseMutations } from '@/utils/vuex'
import {
  FIRESTORE_COLLECTION,
  getFirestoreModule,
} from '@/lib/firebase-pikobar/index'

const defaultState = {
  firstSnapshot: null,
  lastSnapshot: null,
  listOfDonors: [],
  currentPage: 0,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
}

const state = () => defaultState

const getters = {}

const mutations = {
  ...createBaseMutations(defaultState),
}

const actions = {
  async getListOfDonors({ state, getters, commit }, { page = 1 } = {}) {
    if (page !== state.currentPage) {
      const firestore = await getFirestoreModule()
      let query = await firestore
        .collection(FIRESTORE_COLLECTION.DONATION_NON_CASH)
        .orderBy('created_at', 'desc')

      if (page < state.currentPage && state.firstSnapshot) {
        query = query.endBefore(state.firstSnapshot).limitToLast(state.perPage)
      } else if (page > state.currentPage && state.lastSnapshot) {
        query = query.startAfter(state.lastSnapshot).limit(state.perPage)
      } else {
        query = query.limit(state.perPage)
      }

      const [first, last, list] = await query.get().then((snapshots) => {
        if (snapshots.empty) {
          return [null, null]
        }
        const { docs } = snapshots
        const [first, last] = [docs[0], docs[docs.length - 1]]
        const list = docs.map((doc) => ({
          is_verified: false,
          document_id: doc.id,
          ...doc.data(),
        }))
        return [first, last, list]
      })

      const count = await firestore
        .doc('counters/donation')
        .get()
        .then((doc) => doc.get('count'))

      commit('set', {
        key: 'currentPage',
        value: page,
      })
      commit('set', {
        key: 'listOfDonors',
        value: list,
      })
      commit('set', {
        key: 'firstSnapshot',
        value: _cloneDeep(first),
      })
      commit('set', {
        key: 'lastSnapshot',
        value: _cloneDeep(last),
      })
      commit('set', {
        key: 'totalCount',
        value: count,
      })
      commit('set', {
        key: 'totalPages',
        value: Math.ceil(count / state.perPage),
      })
    }
    return state.listOfDonors
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
