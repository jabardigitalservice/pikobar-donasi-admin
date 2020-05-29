import { createBaseMutations } from '../utils/vuex'
import {
  checkExistingToken,
  loginUsingGoogleAuthProvider,
  logout,
} from '../lib/firebase-app'

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
  checkExistingToken({ commit }) {
    return checkExistingToken()
      .then((user) => {
        commit('setAuth', user)
        return true
      })
      .catch((err) => {
        commit('setAuth', null)
        throw err
      })
  },
  loginWithGoogle({ commit }) {
    return loginUsingGoogleAuthProvider()
      .then((user) => {
        commit('setAuth', user)
        return state.user
      })
      .catch((err) => {
        commit('setAuth', null)
        throw err
      })
  },
  logout({ commit }) {
    return logout().then(() => {
      commit('setAuth', null)
    })
  },
}
