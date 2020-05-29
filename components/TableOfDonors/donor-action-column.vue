<template>
  <v-row class="flex-nowrap" justify="start" align="center" dense="">
    <v-col cols="auto">
      <v-btn icon small outlined color="blue" @click.stop="$emit('edit')">
        <v-icon size="16">
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn icon small outlined color="red" @click.stop="$emit('delete')">
        <v-icon size="16">
          mdi-delete
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
