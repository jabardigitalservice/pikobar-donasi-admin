import { initFirebase } from '../utils/firebase'

const initAdminDonasiFirebase = initFirebase(
  '__ADMIN_FIREBASE__',
  process.env.FIREBASE_CONFIG
)

function getAuthModule() {
  return initAdminDonasiFirebase.then(async ({ auth }) => {
    await auth().setPersistence(auth.Auth.Persistence.LOCAL)
    return auth
  })
}

async function checkAuthState() {
  const auth = await getAuthModule()
  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user)
      } else {
        reject(new Error('unauth'))
      }
    })
  })
}

function pickUserData(user) {
  if (user && typeof user === 'object') {
    const { displayName, email, photoURL } = user
    return {
      name: displayName,
      email,
      photoURL,
    }
  }
  return null
}

export function checkExistingToken() {
  return checkAuthState().then((user) => {
    return pickUserData(user)
  })
}

export async function loginUsingGoogleAuthProvider() {
  const auth = await getAuthModule()
  const provider = new auth.GoogleAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')

  return auth()
    .signInWithPopup(provider)
    .then((result) => {
      return pickUserData(result.user)
    })
    .catch((err) => {
      return {
        code: err.code || 500,
        message: err.message,
      }
    })
}

export async function logout() {
  const auth = await getAuthModule()
  return auth().signOut()
}
