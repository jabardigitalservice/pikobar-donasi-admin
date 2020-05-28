<template>
  <v-icon :color="data.is_verified ? 'green' : 'red'">
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
