<template>
  <div>
    <AppContentTitle>
      <AppContentSubheader>
        Konfirmasi Status
      </AppContentSubheader>
      Donasi Tunai
    </AppContentTitle>
    <section>
      <v-card outlined>
        <v-card-title style="border-bottom: 1px solid #ddd;">
          <AppSectionTitle>
            Daftar Donatur
          </AppSectionTitle>
        </v-card-title>
        <TableOfCashDonors @click:row="onRowClicked" />
      </v-card>
    </section>

    <v-dialog v-model="showDetailDialog" width="600px">
      <v-card v-if="focusedDonorData">
        <v-card-title class="flex-wrap">
          <div>
            <small style="opacity: 0.5">
              Detail Donatur
            </small>
            <b class="d-block">
              {{ focusedDonorData.name }}
            </b>
          </div>
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {
    AppContentTitle: () => import('@/components/AppContent/title'),
    AppContentSubheader: () => import('@/components/AppContent/subheader'),
    AppSectionTitle: () => import('@/components/AppContent/section-title'),
    TableOfCashDonors: () => import('@/components/TableOfDonors/Cash'),
  },
  data() {
    return {
      showDetailDialog: false,
      focusedDonorData: null,
    }
  },
  methods: {
    onRowClicked(data) {
      this.focusedDonorData = data
      this.showDetailDialog = true
    },
  },
}
</script>

<style></style>
