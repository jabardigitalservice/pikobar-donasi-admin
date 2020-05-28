import { createBaseMutations } from '../utils/vuex'

const defaultState = {
  isAuth: false,
  user: null,
}

export const state = () => defaultState

export const getters = {}

export const mutations = {
  ...createBaseMutations(defaultState),
  setAuth(state, user) {
    state.isAuth = !!user
    state.user = user
  },
}

export const actions = {
  async checkExistingToken({ commit }) {
    const fn = await import('@/lib/firebase').then((m) =>
      m ? m.checkExistingToken : null
    )
    return fn()
      .then((user) => {
        commit('setAuth', user)
        return true
      })
      .catch((err) => {
        commit('setAuth', null)
        throw err
      })
  },
  async loginWithGoogle({ commit }) {
    const fn = await import('@/lib/firebase').then((m) =>
      m ? m.loginUsingGoogleAuthProvider : null
    )
    return fn()
      .then((user) => {
        commit('setAuth', user)
        return state.user
      })
      .catch((err) => {
        commit('setAuth', null)
        throw err
      })
  },
  async logout({ commit }) {
    const fn = await import('@/lib/firebase').then((m) => (m ? m.logout : null))
    return fn().then(() => {
      commit('setAuth', null)
    })
  },
}
