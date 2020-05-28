<template>
  <v-app>
    <AppBar @toggle:drawer="showDrawer = !showDrawer" />
    <AppNavigationDrawer v-model="showDrawer" />
    <v-content class="grey lighten-5">
      <v-container style="padding: 2rem; padding-left: 4rem;">
        <transition name="page-transition" mode="out-in">
          <nuxt :key="$route.path" style="will-change: opacity, transform;" />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'
import AppNavigationDrawer from '@/components/AppNavigationDrawer'

export default {
  middleware: ['auth'],
  components: {
    AppBar,
    AppNavigationDrawer,
  },
  data() {
    return {
      showDrawer: true,
    }
  },
}
</script>
