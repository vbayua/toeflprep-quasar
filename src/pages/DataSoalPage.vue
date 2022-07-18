<template>
  <q-page
    padding
    class="column"
  >
    <div class="full-width">
      <q-card>
        <q-card-section>
          {{exam.title}}
        </q-card-section>
        <q-card-section>
          {{exam.status}}
        </q-card-section>
      </q-card>
    </div>
    <!-- Table Data Soal -->
    <div class="q-mt-md full-width">
      <q-table
        title="Data Soal"
        :rows="rows"
        :columns="columns"
        row-key="name"
        class="full-width"
        dense
      >
        <template #top-right>
          <q-select
            v-model="selectType"
            :options="options"
            label="Type"
            filled
          />
          <q-input
            v-model="filter"
            borderless
            dense
            debounce="300"
            placeholder="Search"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template #body="items">
          <q-tr :props="items">
            <q-td
              key="question"
              :props="items"
            >
              {{ items.row.question }}
            </q-td>
            <q-td
              key="type"
              :props="items"
            >
              {{ items.row.type }}
            </q-td>
            <q-td
              key="img"
              :props="items"
            >
              {{ items.row.imgUrl }}
            </q-td>
            <q-td
              key="audio"
              :props="items"
            >
              {{ items.row.audioUrl }}
            </q-td>
            <q-td
              key="questionPart"
              :props="items"
            >
              {{ items.row.questionPart }}
            </q-td>
            <q-td
              key="correctAnswer"
              :props="items"
            >
              {{ items.row.correctAnswer }}
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
        <template #bottom>
          <q-btn
            color="primary"
            label="Tambah Data Soal"
          />
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
import { ref } from 'vue'
const columns = [
  {
    name: 'question',
    align: 'left',
    label: 'Test Title',
    field: 'title'
  },
  {
    name: 'type',
    align: 'right',
    label: 'Type',
    field: 'type',
    sortable: true
  },
  {
    name: 'img',
    align: 'right',
    label: 'img',
    field: 'img'
  },
  {
    name: 'audio',
    align: 'right',
    label: 'audio',
    field: 'audio'
  },
  {
    name: 'questionPart',
    align: 'right',
    label: 'Question Part',
    field: 'questionPart'
  },
  {
    name: 'correctAnswer',
    align: 'right',
    label: 'Correct Answer',
    field: 'correctAnswer'
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Actions',
    field: 'actions'
  }
]

export default {
  name: 'DataSoalPage',
  setup () {
    return {
      columns
    }
  },
  data () {
    return {
      rows: ref([]),
      exam: ref('')
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.$store.dispatch('admin/getExamWithDataSoal', id).then(response => {
      this.exam = response.data.exam
      console.log(this.exam)
    }).catch(error => {
      console.log(error)
    })
    console.log(this.$route.params)
  }
}
</script>
