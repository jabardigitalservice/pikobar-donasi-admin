<template>
  <v-dialog :value="value" width="600px" @change="$emit('change', !value)">
    <v-card v-if="data">
      <v-card-title class="flex-wrap" style="border-bottom: 1px solid #ddd;">
        <div>
          <small style="opacity: 0.5">
            Detail Donatur
          </small>
          <br />
          <b class="d-inline-block headline font-weight-bold">
            {{ data.name }}
          </b>
          <a
            :href="`tel:${data.phone}`"
            class="phone-number grey--text text--darken-1"
          >
            / {{ data.phone }}
          </a>
        </div>
      </v-card-title>
      <DetailOfCashDonor :data="data" />
      <v-card-actions
        class="justify-end"
        style="padding: 2rem; border-top: 1px solid #ddd;"
      >
        <v-btn depressed color="grey lighten-3" @click="$emit('change', false)">
          <span class="grey--text text--darken-1">
            Kembali
          </span>
        </v-btn>
        <DonorVerificationButton
          type="cash"
          :donor-id="data.document_id"
          :is-verified="data.is_verified"
          @change:verification_status="onVerificationStatuChanged"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {
    DetailOfCashDonor: () => import('./index'),
    DonorVerificationButton: () =>
      import('@/components/DonorVerificationButton'),
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onVerificationStatuChanged(newStatus) {
      this.$emit('change:verification-status', newStatus)
    },
  },
}
</script>

<style lang="scss" scoped>
.phone-number {
  color: currentColor;

  &,
  &:visited {
    text-decoration: none;
  }

  &:focus,
  &:hover {
    text-decoration: underline;
  }
}
</style>
