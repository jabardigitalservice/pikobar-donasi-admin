<template>
  <v-btn
    :loading="isLoading"
    :outlined="isVerified"
    depressed
    dark
    :color="isVerified ? 'red' : 'green'"
    @click="onChangeVerificationStatus"
  >
    <v-icon left>
      {{ isVerified ? 'mdi-close' : 'mdi-send' }}
    </v-icon>
    <b>
      {{ isVerified ? 'Batalkan Verifikasi Data' : 'Verifikasi Data' }}
    </b>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    type: {
      validator(v) {
        return ['cash', 'non-cash'].includes(v)
      },
      required: true,
    },
    donorId: {
      type: [String, Number],
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    ...mapActions('donors', [
      'changeNonCashDonationVerificationStatus',
      'changeCashDonationVerificationStatus',
    ]),
    async onChangeVerificationStatus() {
      this.isLoading = true
      try {
        switch (this.type) {
          case 'cash':
            await this.changeCashDonationVerificationStatus({
              documentId: this.donorId,
              newStatus: !this.isVerified,
            })
            break
          case 'non-cash':
            await this.changeNonCashDonationVerificationStatus({
              documentId: this.donorId,
              newStatus: !this.isVerified,
            })
            break
        }
        this.$emit('change:verification_status', !this.isVerified)
      } catch (e) {}
      this.isLoading = false
    },
  },
}
</script>

<style></style>
