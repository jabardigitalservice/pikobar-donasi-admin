<template>
  <div>
    <v-data-table
      class="table-of-donors"
      v-bind="datatableProps"
      :headers="tableHeaders"
      :items="tableData"
      :server-items-length="totalCount"
      :page="currentPage"
      @click:row="onRowClicked"
      @update:page="onPageChanged"
    >
      <template #item.is_verified="{item}">
        <DonorVerificationStatus :data="item" />
      </template>
      <template #item.contact="{item}">
        <DonorContacts :data="item" />
      </template>
      <template #item.created_at="{ item }">
        <span>
          {{ formatDate(item.created_at) }}
        </span>
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
import { dayjs } from '@/plugins/dayjs'

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
          text: 'Tanggal',
          value: 'created_at',
          sortable: false,
        },
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
      currentPage: (state) => state.currentPage,
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
    ...mapActions(NAMESPACE, ['getListOfDonors', 'removeDonorData']),
    onReplaceItem(documentId, newItem) {
      this.replaceDonorListItem({
        documentId,
        item: newItem,
      })
    },
    formatDate(itemCreatedAt) {
      return dayjs(itemCreatedAt.seconds * 1000).format('DD-MMMM-YYYY, dddd')
    },
    onEditItem(item) {
      this.onRowClicked(item)
    },
    async onDeleteItem(item) {
      try {
        const confirmed = confirm(
          `Yakin untuk menghapus hapus data donasi dari "${item.name}"?`
        )
        if (confirmed) {
          await this.removeDonorData({ documentId: item.document_id })
          this.getListOfDonors({
            page: 1,
            reset: true,
          })
        }
      } catch (e) {
        alert('Terjadi Kesalahan')
      }
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
