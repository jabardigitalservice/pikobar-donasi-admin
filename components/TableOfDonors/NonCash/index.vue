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
      @pagination="onPaginationUpdated"
    >
      <template #item.is_verified="{item}">
        <DonorVerificationStatus :data="item" />
      </template>
      <template #item.contact="{item}">
        <DonorContacts :data="item" />
      </template>
      <template #item.quantity="{item}">
        <span>
          {{ getItemProvisionsCount(item) }}
        </span>
      </template>
      <template #item.created_at="{ item }">
        <span>
          {{ formatDate(item.created_at) }}
        </span>
      </template>
      <template #item.statement_letter_url="{item}">
        <div>
          <v-btn
            color="white"
            depressed
            @click.stop="onOpenDocumentInNewTab(item)"
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
import { mapState, mapActions } from 'vuex'
import { datatableProps } from '../datatable-mixin'
import vuexModule from './vuex-module'
import { registerModuleOnce } from '@/utils/vuex'
import { dayjs } from '@/plugins/dayjs'

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
          text: 'Jumlah Item Donasi',
          value: 'quantity',
          sortable: false,
        },
        {
          text: 'Surat Pengajuan',
          value: 'statement_letter_url',
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
    this.getListOfDonors({
      page: this.currentPage || 1,
    })
  },
  methods: {
    ...mapActions(NAMESPACE, {
      getListOfDonors: 'getListOfDonors',
      removeDonorData: 'removeDonorData',
    }),
    formatDate(itemCreatedAt) {
      return dayjs(itemCreatedAt.seconds * 1000).format('DD-MMMM-YYYY, dddd')
    },
    getItemProvisionsCount(item) {
      if (!item) return '-'
      // eslint-disable-next-line camelcase
      const { provisions = [], provisions_other = [] } = item
      return provisions.length + provisions_other.length
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
      this.$router.push({
        path: `/admin/confirmation/non-cash/${item.document_id}`,
      })
    },
    onOpenDocumentInNewTab(item) {
      if (!item || !item.statement_letter_url) {
        return
      }
      window.open(item.statement_letter_url, '_blank')
    },
    onPaginationUpdated({ page }) {
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
