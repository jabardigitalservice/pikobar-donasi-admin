<template>
  <v-app-bar app clipped-left class="white">
    <v-app-bar-nav-icon @click.stop="$emit('toggle:drawer')" />
    <AppBrandText class="headline" />
    <v-spacer />
    <UserContextMenu />
  </v-app-bar>
</template>

<script>
export default {
  components: {
    AppBrandText: () => import('@/components/AppBrand/text'),
    UserContextMenu: () => import('./UserContextMenu'),
  },
  data() {
    return {}
  },
}
</script>
