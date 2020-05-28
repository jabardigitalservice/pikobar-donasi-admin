<template>
  <div>
    <v-simple-table>
      <template #default>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td class="subtitle-2 grey--text select-none">
              <b>
                {{ row.label }}
              </b>
            </td>
            <td class="subtitle-1">
              {{ data[row.value] }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tableData() {
      return [
        {
          label: 'Tipe Donatur',
          value: 'entity_type',
        },
        {
          label: 'Nama',
          value: 'name',
        },
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'No. Telp',
          value: 'phone_number',
        },
      ]
    },
  },
}
</script>

<style></style>
