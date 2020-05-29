import { initFirebase } from './firebase-init'

const initAdminDonasiFirebase = initFirebase(
  '__PIKOBAR_FIREBASE__',
  process.env.PIKOBAR_FIREBASE_CONFIG
)

export const FIRESTORE_COLLECTION = {
  DONATION_NON_CASH: 'donation',
  DONATION_CASH: 'donation-cash',
}

export function getFirestoreModule() {
  return initAdminDonasiFirebase.then((firebase) => {
    return firebase.firestore()
  })
}

export function getNonCashDonationFirestoreRef() {
  return getFirestoreModule().then((db) => {
    return db.collection(FIRESTORE_COLLECTION.DONATION_NON_CASH)
  })
}

export function getCashDonationFirestoreRef() {
  return getFirestoreModule().then((db) => {
    return db.collection(FIRESTORE_COLLECTION.DONATION_CASH)
  })
}
