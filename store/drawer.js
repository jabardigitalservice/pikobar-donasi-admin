import { createBaseMutations } from '../utils/vuex'

const menuItemsKPBM = [
  // {
  //   title: 'Beranda',
  //   icon: 'mdi-home',
  //   to: '/admin',
  //   exact: true,
  // },
  {
    title: 'Konfirmasi Pengajuan',
    expanded: true,
    children: [
      {
        title: 'Donasi Non-tunai',
        icon: 'mdi-package-variant',
        to: '/admin/confirmation/non-cash',
      },
    ],
  },
  {
    title: 'Konfirmasi Status',
    noAction: true,
    expanded: true,
    children: [
      {
        title: 'Donasi Tunai',
        icon: 'mdi-cash-100',
        to: '/admin/confirmation/cash',
      },
    ],
  },
]

const defaultState = {
  menuItems: menuItemsKPBM,
}

export const state = () => defaultState

export const getters = {}

export const mutations = {
  ...createBaseMutations(defaultState),
}

export const actions = {}
