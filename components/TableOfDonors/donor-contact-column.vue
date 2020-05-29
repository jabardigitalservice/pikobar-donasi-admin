<template>
  <v-row class="flex-wrap" dense>
    <v-col cols="12">
      <v-btn
        color="white"
        depressed
        small
        style="text-transform: none;"
        :href="`mailto:${data.email}`"
      >
        <v-icon left color="blue">
          mdi-email
        </v-icon>
        {{ data.email }} /
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-btn color="white" depressed small :href="`tel:${data.phone}`">
        <v-icon left color="green">
          mdi-phone
        </v-icon>
        {{ data.phone }}
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
