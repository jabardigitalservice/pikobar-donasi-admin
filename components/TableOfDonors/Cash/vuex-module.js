import Vue from 'vue'
import { createBaseMutations } from '@/utils/vuex'
import { getListOfCashDonors } from '@/lib/firebase-pikobar/donor-list'

const defaultState = {
  listOfDonors: [],
  currentPage: null,
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
  async getListOfDonors({ state, getters, commit }, options = {}) {
    const mOptions = {
      perPage: state.perPage,
      page: 1,
      ...options,
    }
    if (!Array.isArray(state.listOfDonors) || !state.listOfDonors.length) {
      const docs = await getListOfCashDonors({
        perPage: mOptions.perPage,
        page: mOptions.page,
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
