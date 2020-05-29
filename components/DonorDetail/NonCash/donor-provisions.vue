<template>
  <div>
    <v-data-table
      class="donor-provisions-table"
      :items-per-page="10"
      :headers="tableHeaders"
      :items="items"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableHeaders: [
        {
          text: 'Tipe Item',
          value: 'type',
        },
        {
          text: 'Jumlah',
          value: 'quantity',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.donor-provisions-table.v-data-table::v-deep {
  th {
    font-size: 0.875rem;
    color: #9e9e9e;
  }

  td {
    font-size: 1rem;
  }
}
</style>
