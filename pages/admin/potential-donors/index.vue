<template>
  <div>
    <AppContentTitle>
      Calon Donatur Tunai
    </AppContentTitle>
    <section>
      <v-card outlined>
        <TableOfCashDonors ref="tableData" @click:row="onRowClicked" />
      </v-card>
    </section>
    <DetailOfCashDonorDialog
      v-model="showDetailDialog"
      :data="focusedDonorData"
      @change:verification-status="onVerificationStatusChanged"
    />
  </div>
</template>

<script>
export default {
  components: {
    AppContentTitle: () => import('@/components/AppContent/title'),
    TableOfCashDonors: () => import('@/components/TableOfDonors/Cash'),
    DetailOfCashDonorDialog: () =>
      import('@/components/DonorDetail/Cash/dialog'),
  },
  data() {
    return {
      showDetailDialog: false,
      focusedDonorData: null,
    }
  },
  methods: {
    onRowClicked(data) {
      this.focusedDonorData = JSON.parse(JSON.stringify(data))
      this.showDetailDialog = true
    },
    onVerificationStatusChanged(newStatus) {
      this.$set(this.focusedDonorData, 'is_verified', newStatus)
      this.$refs.tableData.onReplaceItem(
        this.focusedDonorData.document_id,
        this.focusedDonorData
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.phone-number {
  opacity: 0.5;
  text-decoration: none;

  &:focus,
  &:hover {
    text-decoration: underline solid #aaa;
  }
}
</style>
