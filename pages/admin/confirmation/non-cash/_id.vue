<template>
  <div>
    <AppContentTitle :show-back-button="true" @click:back="onClickBack">
      <AppContentSubheader>
        Konfirmasi Pengajuan Donasi Non-tunai
      </AppContentSubheader>
      <span>
        {{ donorData.name }}
      </span>
      <small class="font-weight-thin" style="opacity: 0.5;">
        &nbsp;/
        <a class="phone-number" :href="`tel:${donorData.phone_number}`">{{
          donorData.phone_number
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
            Data Donatur <span style="opacity: 0.5">(Non-tunai)</span>
          </AppSectionTitle>
          <DonorVerificationButton
            :donor-id="donorData.id"
            :is-verified="donorData.is_verified"
          />
        </v-card-title>
        <DetailOfNonCashDonor :data="donorData" />
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
    DetailOfNonCashDonor: () => import('@/components/DetailOfDonor/NonCash'),
  },
  data() {
    return {}
  },
  computed: {
    donorData() {
      return {
        id: 2901,
        is_verified: true,
        entity_type: 'Personal',
        name: 'Adrian',
        phone_number: '081214459813',
        email: 'adrian.pdmh@gmail.com',
        statement_letter_url: '/blank.pdf',
        provisions: [
          {
            type: 'APD',
            amount: '10 pcs',
          },
          {
            type: 'Sanitizer',
            amount: '25 pcs',
          },
        ],
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
