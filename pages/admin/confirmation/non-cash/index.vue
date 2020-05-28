<template>
  <div>
    <AppContentTitle>
      <AppContentSubheader>
        Konfirmasi Pengajuan
      </AppContentSubheader>
      Donasi Non-tunai
    </AppContentTitle>
    <section>
      <v-card outlined>
        <v-card-title style="border-bottom: 1px solid #ddd;">
          <AppSectionTitle>
            Daftar Donatur
          </AppSectionTitle>
        </v-card-title>

        <TableOfNonCashDonors />
      </v-card>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    AppContentTitle: () => import('@/components/AppContent/title'),
    AppContentSubheader: () => import('@/components/AppContent/subheader'),
    AppSectionTitle: () => import('@/components/AppContent/section-title'),
    TableOfNonCashDonors: () => import('@/components/TableOfDonors/NonCash'),
  },
}
</script>

<style></style>
