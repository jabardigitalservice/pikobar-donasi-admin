export default function({ app, redirect }) {
  if (app.store.state.auth.isAuth) {
    return Promise.resolve(true)
  }
  return app.store
    .dispatch('auth/checkExistingToken')
    .then(() => {
      return true
    })
    .catch(() => {
      return app.router.replace({
        path: '/login',
      })
    })
}
