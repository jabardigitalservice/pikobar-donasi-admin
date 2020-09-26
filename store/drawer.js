import { createBaseMutations } from '../utils/vuex'

const menuItemsKPBM = [
  // {
  //   title: 'Beranda',
  //   icon: 'mdi-home',
  //   to: '/admin',
  //   exact: true,
  // },
  // {
  //  title: 'Donasi Non-tunai',
  //  expanded: true,
  //  children: [
  //    {
  //      title: 'Konfirmasi Pengajuan',
  //      icon: 'mdi-package-variant',
  //      to: '/admin/confirmation/non-cash',
  //    },
  //  ],
  // },
  {
    title: 'Calon Donatur',
    noAction: false,
    exact: true,
    icon: 'mdi-account-multiple-outline',
    to: '/admin/potential-donors',
  },
  {
    title: 'Logo Donatur Organisasi',
    noAction: true,
    icon: 'mdi-file-image',
    to: '/admin/confirmation/b',
  },
  {
    title: 'Statistik Donasi',
    noAction: true,
    icon: 'mdi-chart-bar',
    to: '/admin/confirmation/d',
  },
  {
    title: 'Laporan Donasi',
    noAction: true,
    icon: 'mdi-file-document',
    to: '/admin/confirmation/v',
  },
  {
    title: 'Tracking Donasi',
    noAction: false,
    icon: 'mdi-map-marker-radius',
    to: '/admin/confirmation/f',
  },
]

const defaultState = {
  isMobile: false,
  menuItems: menuItemsKPBM,
}

export const state = () => defaultState

export const getters = {}

export const mutations = {
  ...createBaseMutations(defaultState),
  mobileView(state, v) {
    state.isMobile = v
  },
}

export const actions = {}
