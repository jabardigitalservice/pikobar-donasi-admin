<template>
  <v-list-group
    v-if="isGroup"
    v-bind="groupProps"
    class="list-group"
    :value="item.expanded"
    :no-action="false"
  >
    <template #activator>
      <v-list-item-content style="flex-wrap: nowrap;">
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <MenuListItem v-for="(c, index) in item.children" :key="index" :item="c" />
  </v-list-group>
  <!--  -->
  <v-list-item v-else v-bind="itemProps" class="list-item">
    <template>
      <v-icon v-if="item.icon" class="list-item__icon" size="">
        {{ item.icon }}
      </v-icon>
      <v-list-item-content class="list-item__content">
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </template>
  </v-list-item>
</template>

<script>
export default {
  name: 'MenuListItem',
  props: {
    isRoot: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    hasLink() {
      return typeof this.item.to === 'string' && this.item.to.length
    },
    hasExternalLink() {
      return this.hasLink && this.item.to.startsWith('http')
    },
    groupProps() {
      return {
        subGroup: !this.isRoot,
        activeClass: 'grey--text',
      }
    },
    itemProps() {
      return {
        nuxt: !this.hasExternalLink,
        link: this.hasExternalLink,
        to: this.item.to,
        exact: this.item.exact,
        activeClass: 'green--text',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.list-item__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1.5rem;
  min-height: 1.5rem;
  margin-right: 1rem;
}

.list-group__icon {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1rem;
}

.list-group .list-item {
  padding-left: 2rem !important;
}
</style>
