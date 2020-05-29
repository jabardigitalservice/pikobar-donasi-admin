<template>
  <v-row no-gutters align="stretch">
    <v-col cols="12">
      <v-simple-table class="donor-detail-table">
        <template #default>
          <tbody>
            <tr>
              <td>Status Verifikasi</td>
              <td>
                <strong
                  :class="[data.is_verified ? 'green--text' : 'red--text']"
                >
                  {{
                    data.is_verified ? 'Terverifikasi' : 'Belum  Terverifikasi'
                  }}
                </strong>
              </td>
            </tr>
            <tr>
              <td>Tipe Donatur</td>
              <td>{{ data.entity_type }}</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td>{{ data.name }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <v-btn
                  depressed
                  :href="`mailto:${data.email}`"
                  style="text-transform: lowercase"
                >
                  <v-icon left color="blue">mdi-email</v-icon>
                  <span>
                    {{ data.email }}
                  </span>
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>No. Telp</td>
              <td>
                <v-btn depressed :href="`tel:${data.phone}`">
                  <v-icon left color="green">mdi-phone</v-icon>
                  <span>
                    {{ data.phone }}
                  </span>
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  Bukti Transfer
                </span>
                <v-btn icon @click="onOpenDocumentInNewTab">
                  <v-icon color="green">
                    mdi-open-in-new
                  </v-icon>
                </v-btn>
              </td>
              <td>
                <PDFViewer
                  :src="data.receipt_url"
                  style="height: 100%; min-height: 400px;"
                  class="flex-grow-1"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    PDFViewer: () => import('@/components/PDFViewer'),
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      cellClass: 'subtitle-2 grey--text select-none',
    }
  },
  methods: {
    onOpenDocumentInNewTab() {
      if (!this.data || !this.data.receipt_url) {
        return
      }
      window.open(this.data.receipt_url, '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
.donor-detail-table.v-data-table::v-deep > .v-data-table__wrapper > table {
  > tbody > tr {
    &:hover {
      background-color: unset !important;
    }
  }
}
</style>
