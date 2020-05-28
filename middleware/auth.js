export default function({ store, redirect }) {
  return store
    .dispatch('auth/checkExistingToken')
    .then(() => {
      return true
    })
    .catch(() => {
      redirect('/login')
    })
}
