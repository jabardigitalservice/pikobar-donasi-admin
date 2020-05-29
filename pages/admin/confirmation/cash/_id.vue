<template>
  <div>
    <AppContentTitle :show-back-button="true" @click:back="onClickBack">
      <AppContentSubheader>
        Konfirmasi Pengajuan Donasi Tunai
      </AppContentSubheader>
      <span>
        {{ donorData.name }}
      </span>
      <small class="font-weight-thin" style="opacity: 0.5;">
        &nbsp;/
        <a class="phone-number" :href="`tel:${donorData.phone}`">{{
          donorData.phone
        }}</a>
      </small>
    </AppContentTitle>
    <section>
      <v-card>
        <v-card-title
          class="justify-space-between"
          style="border-bottom: 1px solid #ddd;"
        >
          <AppSectionTitle>
            Data Donatur <span style="opacity: 0.5">(Tunai)</span>
          </AppSectionTitle>
          <DonorVerificationButton
            type="cash"
            :donor-id="donorData.id"
            :is-verified="donorData.is_verified"
          />
        </v-card-title>
        <DetailOfCashDonor :data="donorData" />
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
    DonorVerificationButton: () =>
      import('@/components/DonorVerificationButton'),
    DetailOfCashDonor: () => import('@/components/DetailOfDonor/Cash'),
  },
  computed: {
    donorData() {
      return {
        id: 2901,
        is_verified: false,
        entity_type: 'Personal',
        name: 'Adrian',
        phone: '081214459813',
        email: 'adrian.pdmh@gmail.com',
        receipt_url: '/blank.pdf',
      }
    },
  },
  methods: {
    onClickBack() {
      this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
.phone-number {
  color: currentColor;

  &,
  &:visited {
    text-decoration: none;
  }

  &:focus,
  &:hover {
    text-decoration: underline;
  }
}
</style>
