<template>
  <v-list expand>
    <MenuListItem
      v-for="(item, i) in menuItems"
      :key="i"
      :item="item"
      :is-root="true"
    >
    </MenuListItem>
  </v-list>
</template>

<script>
export default {
  name: 'MenuList',
  components: {
    MenuListItem: () => import('./list-item'),
  },
  computed: {
    menuItems() {
      return this.$store.state.drawer.menuItems
    },
  },
}
</script>
