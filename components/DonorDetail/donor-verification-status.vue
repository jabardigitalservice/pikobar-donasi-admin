<template>
  <transition name="verification-transition" mode="out-in">
    <div
      v-if="isVerified"
      key="verified"
      class="d-flex align-center green--text"
    >
      <v-icon left style="color: currentColor">
        mdi-check-decagram
      </v-icon>
      <strong>
        Terverifikasi
      </strong>
    </div>
    <div v-else key="not_verified" class="d-flex align-center red--text">
      <v-icon left style="color: currentColor">
        mdi-alert-circle
      </v-icon>
      <strong>
        Belum Terverifikasi
      </strong>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.verification-transition {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-out;
  }

  &-enter,
  &-leave-to {
    transform: translateX(1rem);
    opacity: 0;
  }
}
</style>
