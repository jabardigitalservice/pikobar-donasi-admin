<template>
  <div>
    <v-data-table
      class="table-of-donors"
      v-bind="datatableProps"
      :headers="tableHeaders"
      :items="tableData"
      :server-items-length="totalCount"
      @click:row="onRowClicked"
      @update:page="onPageChanged"
    >
      <template #item.is_verified="{item}">
        <DonorVerificationStatus :data="item" />
      </template>
      <template #item.contact="{item}">
        <DonorContacts :data="item" />
      </template>
      <template #item.receipt="{item}">
        <div>
          <v-btn
            color="white"
            depressed
            @click.stop="onOpenReceiptInNewTab(item)"
          >
            <v-icon size="24" color="grey">
              mdi-text-box-outline
            </v-icon>
          </v-btn>
        </div>
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
import { mapState, mapMutations, mapActions } from 'vuex'
import { datatableProps } from '../datatable-mixin'
import vuexModule from './vuex-module'
import { registerModuleOnce } from '@/utils/vuex'

const NAMESPACE = 'cash_donors_table'
export default {
  components: {
    DonorVerificationStatus: () =>
      import('../donor-verification-status-column'),
    DonorContacts: () => import('../donor-contact-column'),
    DonorItemAction: () => import('../donor-action-column.vue'),
  },
  data() {
    return {
      datatableProps,
      tableHeaders: [
        {
          text: 'Status',
          value: 'is_verified',
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
          text: 'Nominal',
          value: 'amount',
          sortable: false,
        },
        {
          text: 'Bukti Transfer',
          value: 'receipt',
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
      totalCount: (state) => state.totalCount || 0,
    }),
  },
  beforeCreate() {
    registerModuleOnce(this.$store, NAMESPACE, vuexModule)
  },
  beforeMount() {
    this.getListOfDonors()
  },
  methods: {
    ...mapMutations(NAMESPACE, ['replaceDonorListItem']),
    ...mapActions(NAMESPACE, ['getListOfDonors']),
    onReplaceItem(documentId, newItem) {
      this.replaceDonorListItem({
        documentId,
        item: newItem,
      })
    },
    onEditItem(item) {
      this.onRowClicked(item)
    },
    onDeleteItem() {
      alert('on development')
    },
    onRowClicked(item) {
      this.$emit('click:row', item)
    },
    onOpenReceiptInNewTab(item) {
      if (!item || !item.receipt_url) {
        return
      }
      window.open(item.receipt_url, '_blank')
    },
    onPageChanged(page) {
      this.getListOfDonors({
        page,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../table-of-donors.scss';
</style>
