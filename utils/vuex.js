export function registerModuleOnce(store, namespace, module) {
  if (typeof namespace !== 'string' || !namespace.length) {
    throw new SyntaxError(
      '[vuex] registerModuleOnce: namespace must be type of string'
    )
  }
  if (!module || typeof module !== 'object') {
    throw new SyntaxError('[vuex] registerModuleOnce: invalid module options')
  }
  const path = namespace.split('/')
  if (store.hasModule(path)) {
    return
  }
  store.registerModule(path, {
    namespaced: true,
    ...module,
  })
}

export function createBaseMutations(defaultState = {}) {
  return {
    set(state, { key, value } = {}) {
      if (!key) return
      state[key] = value
    },
    reset(state, { key }) {
      if (!key || !(key in defaultState)) return
      state[key] = defaultState[key]
    },
  }
}
