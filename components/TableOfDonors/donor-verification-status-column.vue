<template>
  <v-icon
    :color="data.is_verified ? 'green' : 'red'"
    :style="{ opacity: data.is_verified ? 1 : 0.25 }"
  >
    {{ data.is_verified ? 'mdi-check-decagram' : 'mdi-alert-circle' }}
  </v-icon>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
