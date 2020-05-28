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
export default {
  props: {
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
    async onChangeVerificationStatus() {
      this.isLoading = true
      await new Promise((resolve) => {
        setTimeout(() => {
          this.$emit('change:verification-status', !this.isVerified)
          resolve()
          alert('on development')
        }, 1000)
      })
      this.isLoading = false
    },
  },
}
</script>

<style></style>
