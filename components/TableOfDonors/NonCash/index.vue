<template>
  <div>
    <v-data-table
      class="table-of-non-cash-donors"
      :items-per-page="15"
      :headers="tableHeaders"
      :items="tableData"
      @click:row="onRowClicked"
    >
      <template #item.is_verified="{item}">
        <DonorVerificationStatus :data="item" />
      </template>
      <template #item.contact="{item}">
        <DonorContacts :data="item" />
      </template>
      <template #item.amount="{item}">
        <span>
          {{ item.provisions.length }}
        </span>
      </template>
      <template #item.action="{item}">
        <DonorItemAction
          :data="item"
          @edit="onEditItem(item)"
          @delete="onDeleteItem(item)"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vuexModule from './vuex-module'
import { registerModuleOnce } from '@/utils/vuex'

const NAMESPACE = 'non_cash_donors_table'
export default {
  components: {
    DonorVerificationStatus: () =>
      import('../donor-verification-status-column'),
    DonorContacts: () => import('../donor-contact-column'),
    DonorItemAction: () => import('../donor-action-column'),
  },
  data() {
    return {
      tableHeaders: [
        {
          text: 'Status',
          value: 'is_verified',
          sortable: false,
        },
        {
          text: 'Tipe Donatur',
          value: 'entity_type',
          sortable: false,
        },
        {
          text: 'Nama Donatur',
          value: 'name',
          sortable: false,
        },
        {
          text: 'Kontak',
          value: 'contact',
          sortable: false,
        },
        {
          text: 'No. Telp',
          value: 'phone_number',
          sortable: false,
        },
        {
          text: 'Jumlah Item Donasi',
          value: 'amount',
          sortable: false,
        },
        {
          text: 'Aksi',
          value: 'action',
          sortable: false,
          width: 0,
        },
      ],
    }
  },
  computed: {
    ...mapState(NAMESPACE, {
      tableData: (state) => state.listOfDonors || [],
    }),
  },
  beforeCreate() {
    registerModuleOnce(this.$store, NAMESPACE, vuexModule)
  },
  methods: {
    onEditItem(item) {
      this.onRowClicked(item)
    },
    onDeleteItem() {
      alert('on development')
    },
    onRowClicked(item) {
      this.$router.push({
        path: `/admin/confirmation/non-cash/${item.id}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.table-of-non-cash-donors.v-data-table::v-deep {
  tbody tr {
    cursor: pointer;
  }
}
</style>
