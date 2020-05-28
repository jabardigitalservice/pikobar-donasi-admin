<template>
  <v-layout column justify-center align-center> </v-layout>
</template>

<script>
export default {
  layout: 'centered',
  components: {},
  created() {
    this.$router.replace(
      {
        path: '/login',
      },
      null,
      () => {}
    )
  },
}
</script>
