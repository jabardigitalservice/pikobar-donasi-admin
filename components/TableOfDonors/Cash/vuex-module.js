import { createBaseMutations } from '@/utils/vuex'

const mock = [
  {
    id: 2901,
    entity_type: 'Personal',
    name: 'Adrian',
    phone_number: '081214459813',
    email: 'adrian.pdmh@gmail.com',
    receipt_url: '/blank.pdf',
  },
]

const defaultState = {
  listOfDonors: mock,
}

const state = () => defaultState

const getters = {}

const mutations = {
  ...createBaseMutations(defaultState),
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
}
