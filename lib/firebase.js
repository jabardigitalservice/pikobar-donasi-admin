// initialized as async module to minimize entry bundle size
// eslint-disable-next-line
const initFirebase = new Promise(async (resolve, reject) => {
  if (!window.__FIREBASE) {
    const firebase = await import('firebase/app').then((m) => {
      if (!m) {
        reject(new ReferenceError('[firebase]: module not found'))
      }
      return m.default || m
    })
    // import firebase modules
    await Promise.all([import('firebase/auth')])

    let cfg = process.env.FIREBASE_CONFIG || null
    if (typeof cfg !== 'string' || !cfg.length) {
      reject(new ReferenceError('[firebase]: credentials not found'))
      return
    }
    cfg = JSON.parse(cfg.replace(/\s/g, ''))
    firebase.initializeApp(cfg)

    window.__FIREBASE = firebase
  }
  resolve(window.__FIREBASE)
})

function getAuthModule() {
  return initFirebase.then(async ({ auth }) => {
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
