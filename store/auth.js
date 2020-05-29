import { createBaseMutations } from '../utils/vuex'
import {
  checkExistingToken,
  loginUsingGoogleAuthProvider,
  loginUsingEmailAndPassword,
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
  loginUsingEmailAndPassword({ dispatch }, { email, password }) {
    return dispatch('handleLogin', () =>
      loginUsingEmailAndPassword(email, password)
    )
  },
  loginWithGoogle({ dispatch }) {
    return dispatch('handleLogin', () => loginUsingGoogleAuthProvider())
  },
  handleLogin({ commit }, loginMethod) {
    return loginMethod()
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
