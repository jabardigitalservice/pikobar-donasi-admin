<template>
  <h3 v-once class="text-center">
    <span
      v-if="!$store.state.drawer.isMobile"
      class="blue-grey--text text--lighten-1"
    >
      Pikobar
    </span>
    <strong class="green--text">
      Donasi
    </strong>
  </h3>
</template>
