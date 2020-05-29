// initialized as async module to minimize entry bundle size
export function initFirebase(namespace, config) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    if (!window[namespace]) {
      const firebase = await import('firebase/app').then((m) => {
        if (!m) {
          reject(new ReferenceError('[firebase]: module not found'))
        }
        return m.default || m
      })
      // import firebase modules
      await Promise.all([import('firebase/auth'), import('firebase/firestore')])

      let cfg = config || null
      if (typeof cfg !== 'string' || !cfg.length) {
        reject(new ReferenceError('[firebase]: credentials not found'))
        return
      }
      cfg = JSON.parse(cfg.replace(/\s/g, ''))
      if (namespace === '__ADMIN_FIREBASE__') {
        firebase.initializeApp(cfg)
        window[namespace] = firebase
      } else {
        const app = firebase.initializeApp(cfg, namespace)
        window[namespace] = app
        console.log(firebase.apps)
      }
    }
    resolve(window[namespace])
  })
}
