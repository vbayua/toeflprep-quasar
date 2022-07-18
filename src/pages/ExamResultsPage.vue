<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-mt-md">
      <q-table
        title="Data Hasil"
        :rows="rows"
        :columns="columns"
        row-key="name"
        class="full-width"
        dense
      >
        <template #body="items">
          <q-tr :props="items">
            <q-td
              key="title"
              :props="items"
            >
              {{ items.row.name }}
            </q-td>
            <q-td
              key="calories"
              :props="items"
            >
              {{ items.row.calories }}
            </q-td>
            <q-td
              key="fat"
              :props="items"
            >
              {{ items.row.fat }}
            </q-td>
            <q-td
              key="carbs"
              :props="items"
            >
              {{ items.row.carbs }}
            </q-td>
            <q-td
              key="actions"
              :props="items"
            >
              <q-btn
                flat
                round
                color="primary"
                icon="edit"
                dense
              />

              <q-btn
                flat
                round
                color="negative"
                icon="delete"
                dense
              />
            </q-td>
          </q-tr>
        </template>
        <template #no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-black q-gutter-sm">
            <q-icon
              size="2em"
              name="sentiment_dissatisfied"
            />
            <span>
              {{ message }}
            </span>
            <q-icon
              size="2em"
              :name="filter ? 'filter_b_and_w' : icon"
            />
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
const columns = [
  {
    name: 'title',
    align: 'left',
    label: 'Title',
    field: 'title'
  },
  {
    name: 'calories',
    align: 'right',
    label: 'Date',
    field: 'calories',
    sortable: true
  },
  {
    name: 'fat',
    align: 'right',
    label: 'Raw Score',
    field: 'fat',
    sortable: true
  },
  {
    name: 'carbs',
    align: 'right',
    label: 'Scaled Score',
    field: 'carbs',
    sortable: true
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Actions',
    field: 'actions'
  }
]
const rows = []

export default {
  name: 'ExamData',
  setup () {
    return {
      columns,
      rows
    }
  }
}
</script>
