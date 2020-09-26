<template>
  <v-app-bar app class="white">
    <v-app-bar-nav-icon
      class="blue-grey--text text--lighten-3"
      @click.stop="$emit('toggle:drawer')"
    >
      <v-icon>mdi-apps</v-icon>
    </v-app-bar-nav-icon>
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
