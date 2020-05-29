import { createBaseMutations } from '@/utils/vuex'
import { getListOfNonCashDonors } from '@/lib/firebase-pikobar/donor-list'

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
}

const actions = {
  async getListOfDonors({ state, getters, commit }, options = {}) {
    const mOptions = {
      perPage: state.perPage,
      page: 1,
      ...options,
    }
    const docs = await getListOfNonCashDonors({
      perPage: mOptions.perPage,
      page: mOptions.page,
    })
    commit('set', {
      key: 'listOfDonors',
      value: docs,
    })
    return state.listOfDonors
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
