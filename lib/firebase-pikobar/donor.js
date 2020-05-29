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
  const ref = await getCashDonationFirestoreRef().doc(documentId)
  return await getDonorData(ref)
}

export async function getNonCashDonorData(documentId) {
  const ref = await getNonCashDonationFirestoreRef().doc(documentId)
  return await getDonorData(ref)
}

export async function changeCashDonorVerificationStatus(documentId, newStatus) {
  const ref = await getCashDonationFirestoreRef().doc(documentId)
  return ref.set(
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
  const ref = await getNonCashDonationFirestoreRef().doc(documentId)
  return ref.set(
    {
      is_verified: newStatus || false,
    },
    { merge: true }
  )
}
