import {
  getCashDonorData,
  getNonCashDonorData,
  changeCashDonorVerificationStatus,
  changeNonCashDonorVerificationStatus,
} from '../lib/firebase-pikobar/donor'

export const actions = {
  getNonCashDonorByDocumentId({ state, getters, commit }, id) {
    return getNonCashDonorData(id)
  },
  getCashDonorByDocumentId({ state, getters, commit }, id) {
    return getCashDonorData(id)
  },
  changeCashDonorVerificationStatus(_, { documentId, newStatus }) {
    return changeCashDonorVerificationStatus(documentId, newStatus)
  },
  changeNonCashDonorVerificationStatus(_, { documentId, newStatus }) {
    return changeNonCashDonorVerificationStatus(documentId, newStatus)
  },
}
