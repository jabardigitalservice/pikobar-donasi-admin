<template>
  <header
    class="d-flex justify-start align-center flex-nowrap"
    style="position: relative; margin-bottom: 3rem;"
  >
    <v-btn
      v-if="showBackButton"
      icon
      style="position: absolute; right: 100%; margin-right: 1rem;"
      @click="$emit('click:back')"
    >
      <v-icon>
        mdi-arrow-left
      </v-icon>
    </v-btn>
    <h3 class="headline grey--text text--darken-3">
      <strong>
        <slot></slot>
      </strong>
    </h3>
  </header>
</template>

<script>
export default {
  props: {
    showBackButton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
