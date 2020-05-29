<template>
  <div style="margin-left: -0.5rem;">
    <v-row class="flex-wrap" dense>
      <v-col cols="12">
        <v-btn
          color="white"
          depressed
          small
          style="text-transform: none;"
          :href="`mailto:${data.email}`"
        >
          <v-icon left color="grey">
            mdi-email-outline
          </v-icon>
          {{ data.email }}
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn color="white" depressed small :href="`tel:${data.phone}`">
          <v-icon left color="grey">
            mdi-phone-outline
          </v-icon>
          {{ data.phone }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
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
