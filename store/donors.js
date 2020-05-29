import {
  getCashDonorData,
  getNonCashDonorData,
  changeCashDonorVerificationStatus,
  changeNonCashDonorVerificationStatus,
} from '../lib/firebase-pikobar/donor'

export const actions = {
  getNonCashDonorByDocumentId(_, id) {
    return getNonCashDonorData(id)
  },
  getCashDonorByDocumentId(_, id) {
    return getCashDonorData(id)
  },
  changeCashDonorVerificationStatus(_, { documentId, newStatus }) {
    return changeCashDonorVerificationStatus(documentId, newStatus)
  },
  changeNonCashDonorVerificationStatus(_, { documentId, newStatus }) {
    return changeNonCashDonorVerificationStatus(documentId, newStatus)
  },
}
