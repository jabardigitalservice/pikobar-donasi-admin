<template>
  <v-row class="flex-wrap" dense>
    <v-col cols="auto">
      <v-btn
        v-if="data.email"
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
    <v-col>
      <v-btn depressed small :href="`tel:${data.phone_number}`">
        <v-icon left color="green">
          mdi-phone
        </v-icon>
        {{ data.phone_number }}
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
