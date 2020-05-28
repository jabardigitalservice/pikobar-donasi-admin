<template>
  <v-avatar :size="$attrs.size">
    <img :src="avatar" style="object-fit: cover; object-position: center;" />
  </v-avatar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('auth', {
      avatar: (state) => (state.user ? state.user.photoURL : null),
    }),
  },
}
</script>

<style></style>
