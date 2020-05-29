<template>
  <div>
    <v-data-table
      class="table-of-donors"
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
      <template #item.quantity="{item}">
        <span>
          {{ item.provisions.length }}
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
    }),
  },
  beforeCreate() {
    registerModuleOnce(this.$store, NAMESPACE, vuexModule)
  },
  beforeMount() {
    this.getListOfDonors()
  },
  methods: {
    ...mapActions(NAMESPACE, {
      getListOfDonors: 'getListOfDonors',
    }),
    onEditItem(item) {
      this.onRowClicked(item)
    },
    onDeleteItem() {
      alert('on development')
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
  },
}
</script>

<style lang="scss" scoped>
@import '../table-of-donors.scss';
</style>
