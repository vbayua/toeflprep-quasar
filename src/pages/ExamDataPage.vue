<template>
  <q-page
    padding
  >
    <div class="row q-mt-md q-ml-auto">
      <q-table
        title="Data Ujian TOEFL"
        :rows="rows"
        :columns="columns"
        row-key="name"
        class="full-width"
      >
        <template #top-right>
          <q-btn
            color="primary"
            label="Tambah Data Ujian"
            to="/admin/exam-data/add"
          />
        </template>
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
                dense
                to="/admin/exam-data/soal/"
                color="dark"
                icon-right="post_add"
                label="Data Soal"
              />
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
    label: 'Test Title',
    field: 'title'
  },
  {
    name: 'calories',
    align: 'right',
    label: 'Calories',
    field: 'calories',
    sortable: true
  },
  {
    name: 'fat',
    align: 'right',
    label: 'Fat',
    field: 'fat',
    sortable: true
  },
  {
    name: 'carbs',
    align: 'right',
    label: 'Carbs',
    field: 'carbs',
    sortable: true
  },
  {
    name: 'actions',
    align: 'right',
    label: 'Actions',
    field: 'actions'
  }
]
const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37
  },
  {
    name: 'Ice scream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37
  }
]

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
