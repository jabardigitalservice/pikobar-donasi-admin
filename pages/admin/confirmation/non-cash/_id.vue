<template>
  <div>
    <template v-if="donorData">
      <AppContentTitle :show-back-button="true" @click:back="onClickBack">
        <AppContentSubheader>
          Konfirmasi Pengajuan Donasi Non-tunai
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
              Data Donatur <span style="opacity: 0.5">(Non-tunai)</span>
            </AppSectionTitle>
            <DonorVerificationButton
              type="non-cash"
              :donor-id="donorData.document_id"
              :is-verified="donorData.is_verified"
              @change:verification_status="onVerificationStatuChanged"
            />
          </v-card-title>
          <DetailOfNonCashDonor :data="donorData" />
        </v-card>
      </section>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  components: {
    AppContentTitle: () => import('@/components/AppContent/title'),
    AppContentSubheader: () => import('@/components/AppContent/subheader'),
    AppSectionTitle: () => import('@/components/AppContent/section-title'),
    DonorVerificationButton: () =>
      import('@/components/DonorVerificationButton'),
    DetailOfNonCashDonor: () => import('@/components/DetailOfDonor/NonCash'),
  },
  validate({ params, redirect }) {
    if (typeof params.id === 'string' && params.id.length) {
      return true
    }
    return redirect('/admin/confirmation/non-cash')
  },
  data() {
    return {
      donorData: null,
    }
  },
  created() {
    this.getDonorData()
  },
  methods: {
    ...mapActions('donors', {
      getNonCashDonorByDocumentId: 'getNonCashDonorByDocumentId',
    }),
    getDonorData() {
      this.donorData = null
      return this.getNonCashDonorByDocumentId(this.$route.params.id).then(
        (data) => {
          this.donorData = data
        }
      )
    },
    onClickBack() {
      this.$router.back()
    },
    onVerificationStatuChanged(newStatus) {
      this.$set(this.donorData, 'is_verified', newStatus)
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
