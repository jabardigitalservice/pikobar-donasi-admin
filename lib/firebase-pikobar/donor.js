import {
  getCashDonationFirestoreRef,
  getNonCashDonationFirestoreRef,
} from './index'

function getDonorData(ref) {
  return ref.get().then((doc) => {
    if (doc.exists) {
      return {
        is_verified: false,
        document_id: doc.id,
        ...doc.data(),
      }
    } else {
      return null
    }
  })
}

export async function getCashDonorData(documentId) {
  const ref = await getCashDonationFirestoreRef()
  return await getDonorData(ref.doc(documentId))
}

export async function getNonCashDonorData(documentId) {
  const ref = await getNonCashDonationFirestoreRef()
  return await getDonorData(ref.doc(documentId))
}

export async function changeCashDonorVerificationStatus(documentId, newStatus) {
  const ref = await getCashDonationFirestoreRef()
  return ref.doc(documentId).set(
    {
      is_verified: newStatus,
    },
    { merge: true }
  )
}

export async function changeNonCashDonorVerificationStatus(
  documentId,
  newStatus
) {
  const ref = await getNonCashDonationFirestoreRef()
  return ref.doc(documentId).set(
    {
      is_verified: newStatus || false,
    },
    { merge: true }
  )
}

export async function removeNonCashDonorData(id) {
  console.log({ id })
  const ref = await getNonCashDonationFirestoreRef()
  return ref.doc(id).delete()
}

export async function removeCashDonorData(id) {
  const ref = await getCashDonationFirestoreRef()
  return ref.doc(id).delete()
}
