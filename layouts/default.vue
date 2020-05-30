<template>
  <v-app>
    <AppBar @toggle:drawer="showDrawer = !showDrawer" />
    <AppNavigationDrawer v-model="showDrawer" />
    <v-content class="grey lighten-5">
      <v-container
        :style="[
          $store.state.drawer.isMobile
            ? 'padding: 1.5rem; padding-left: 1.5rem;'
            : 'padding: 2rem; padding-left: 2rem;',
        ]"
      >
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
      firstLoad: true,
      showDrawer: true,
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onResize() {
      const areMobile = window.innerWidth < 600
      if (areMobile && this.firstLoad) {
        this.firstLoad = false
        this.showDrawer = false
      }
      this.$store.commit('drawer/mobileView', areMobile)
    },
  },
}
</script>
