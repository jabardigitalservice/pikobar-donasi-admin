import Vue from 'vue'
import { createBaseMutations } from '@/utils/vuex'

const defaultState = {
  listOfDonors: [],
  currentPage: 1,
  perPage: 15,
}

const state = () => defaultState

const getters = {
  skipCount(state) {
    return (state.currentPage - 1) * state.perPage
  },
}

const mutations = {
  ...createBaseMutations(defaultState),
  replaceDonorListItem(state, { documentId, item }) {
    const i = state.listOfDonors.findIndex((x) => x.document_id === documentId)
    Vue.set(state.listOfDonors, i, item)
  },
}

const actions = {
  async getListOfDonors({ state, getters, commit }) {
    const fn = await import('@/lib/firebase-pikobar').then((m) =>
      m ? m.getCashDonationFirestoreRef : null
    )
    if (typeof fn === 'function') {
      const ref = await fn()
      const docs = await ref
        .limit(state.perPage)
        .get()
        .then((snapshots) => {
          return snapshots.docs.map((doc) => ({
            is_verified: false,
            document_id: doc.id,
            ...doc.data(),
          }))
        })
      commit('set', {
        key: 'listOfDonors',
        value: docs,
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
