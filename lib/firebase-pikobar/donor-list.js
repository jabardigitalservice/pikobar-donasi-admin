import {
  getCashDonationFirestoreRef,
  getNonCashDonationFirestoreRef,
} from './index'

function getListOfDonors({ ref, page, perPage }) {
  return ref
    .limit(perPage)
    .get()
    .then((snapshots) => snapshots.docs)
    .then((docs) => {
      return docs.map((doc) => ({
        is_verified: false,
        document_id: doc.id,
        ...doc.data(),
      }))
    })
}

export async function getListOfCashDonors({ perPage = 15, page = 1 } = {}) {
  const ref = await getCashDonationFirestoreRef()
  const list = await getListOfDonors({
    ref,
    page,
    perPage,
  })
  return list
}

export async function getListOfNonCashDonors({ perPage = 15, page = 1 } = {}) {
  const ref = await getNonCashDonationFirestoreRef()
  const list = await getListOfDonors({
    ref,
    page,
    perPage,
  })
  return list
}
