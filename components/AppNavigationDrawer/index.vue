<template>
  <v-navigation-drawer
    width="300px"
    clipped
    stateless
    :value="value"
    app
    @change="onToggled"
  >
    <MenuList />
  </v-navigation-drawer>
</template>

<script>
export default {
  components: {
    MenuList: () => import('./Menu/list'),
  },
  model: {
    prop: 'value',
    event: 'toggled',
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      drawerMenuItems: [],
    }
  },
  methods: {
    onToggled() {
      this.$emit('toggled')
    },
  },
}
</script>
