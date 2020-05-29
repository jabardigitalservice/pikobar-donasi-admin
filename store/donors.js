function getDocument(documentRef) {
  return documentRef.get().then((doc) => {
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

function changeVerificationStatus(documentRef, newStatus) {
  return documentRef.set(
    {
      is_verified: newStatus,
    },
    { merge: true }
  )
}

export const actions = {
  async getNonCashDonorByDocumentId({ state, getters, commit }, id) {
    const fn = await import('@/lib/firebase-pikobar').then((m) =>
      m ? m.getNonCashDonationFirestoreRef : null
    )
    if (typeof fn === 'function') {
      const ref = await fn()
      return getDocument(ref.doc(id))
    }
    return null
  },
  async getCashDonorByDocumentId({ state, getters, commit }, id) {
    const fn = await import('@/lib/firebase-pikobar').then((m) =>
      m ? m.getCashDonationFirestoreRef : null
    )
    if (typeof fn === 'function') {
      const ref = await fn()
      return getDocument(ref.doc(id))
    }
    return null
  },
  async changeNonCashDonationVerificationStatus(_, { documentId, newStatus }) {
    const fn = await import('@/lib/firebase-pikobar').then((m) =>
      m ? m.getNonCashDonationFirestoreRef : null
    )
    if (typeof fn === 'function') {
      const ref = await fn()
      return changeVerificationStatus(ref.doc(documentId), newStatus)
    }
  },
  async changeCashDonationVerificationStatus(_, { documentId, newStatus }) {
    const fn = await import('@/lib/firebase-pikobar').then((m) =>
      m ? m.getCashDonationFirestoreRef : null
    )
    if (typeof fn === 'function') {
      const ref = await fn()
      return changeVerificationStatus(ref.doc(documentId), newStatus)
    }
  },
}
