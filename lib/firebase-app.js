import { initFirebase } from '../utils/firebase'

const NAMESPACE = '__ADMIN_FIREBASE__'

const initAdminDonasiFirebase = initFirebase(
  NAMESPACE,
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
      name: displayName || email.split('@')[0],
      email,
      photoURL,
    }
  }
  return null
}

function handleAuthSuccess(result) {
  return pickUserData(result.user)
}

function handleAuthError(err) {
  throw new Error(err.message)
}

export function checkExistingToken() {
  return checkAuthState().then((user) => {
    return pickUserData(user)
  })
}

export async function getGoogleAuthProvider() {
  if (!window[NAMESPACE].googleAuthProvider) {
    const auth = await getAuthModule()
    window[NAMESPACE].googleAuthProvider = new auth.GoogleAuthProvider()
  }
  return window[NAMESPACE].googleAuthProvider
}

export async function loginUsingGoogleAuthProvider() {
  const auth = await getAuthModule()
  const provider = await getGoogleAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')

  return auth()
    .signInWithPopup(provider)
    .then(handleAuthSuccess)
    .catch(handleAuthError)
}

export async function loginUsingEmailAndPassword(email, password) {
  if (!email || !password) {
    throw new ReferenceError('invalid email / password')
  }
  const auth = await getAuthModule()
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(handleAuthSuccess)
    .catch(handleAuthError)
}

export async function logout() {
  const auth = await getAuthModule()
  return auth().signOut()
}
