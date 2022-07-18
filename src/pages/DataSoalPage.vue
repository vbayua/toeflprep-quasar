<template>
  <q-page
    padding
    class="row"
  >
    <!-- content -->
    <div class="full-width">
      <q-card class="column">
        <div class="q-mt-md text-h5">
          <span>
            Data Soal Ujian
          </span>
        </div>
        <q-separator
          inset
          dark
        />
        <q-form
          class="q-gutter-md"
          @submit="onSubmit"
          @reset="onReset"
        >
          <q-card-section>
            <q-input
              v-model="testTitle"
              type="text"
              label="Title"
            />
          </q-card-section>
          <q-card-section>
            <div>
              <q-btn
                label="Submit"
                type="submit"
                color="primary"
              />
              <q-btn
                label="Back"
                to="/admin/exam-data"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-card-section>
        </q-form>
      </q-card>
    </div>

    <!-- Table Data Soal -->
    <div class="q-mt-md">
      <q-table
        title="Data Soal"
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
    align: 'center',
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
  name: 'DataSoalPage',
  setup () {
    return {
      columns,
      rows
    }
  },
  mounted () {
    console.log(this.$route.params)
  }
}
</script>
