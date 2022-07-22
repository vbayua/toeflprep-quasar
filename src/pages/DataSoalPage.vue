<template>
  <q-page
    padding
    class="column"
  >
    <!-- TODO -->
    <!-- ADD SET AS ACTIVE BUTTON TO START THE TEST -->
    <div class="full-width">
      <q-card>
        <q-card-section>
          <q-btn
            flat
            color="primary"
            label="Back"
            icon="arrow_back"
            to="/admin/exam-data"
          />
        </q-card-section>
        <q-card-section>
          {{ exam.title }}
        </q-card-section>
        <q-card-section>
          {{ exam.status }}
        </q-card-section>
        <div v-if="!!questions">
          <q-card-actions
            align="right"
          >
            <q-btn
              flat
              color="secondary"
              label="Set as Active"
            />
          </q-card-actions>
        </div>
      </q-card>
    </div>
    <!-- Table Data Soal -->
    <div class="q-mt-md text-right">
      <q-btn
        color="primary"
        label="Tambah Data Soal"
        :to="{ name: 'questionform', params: { id: exam._id }}"
      />
    </div>
    <div class="q-mt-md full-width">
      <q-table
        title="Questions"
        :rows="questionData"
        :columns="columns"
        :filter="filter"
        row-key="title"
      >
        <template #top-right>
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
              key="question_id"
              :props="items"
            >
              {{ items.row._id }}
            </q-td>
            <q-td
              key="questionType"
              :props="items"
            >
              {{ items.row.questionType }}
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
              key="showAnswerOptions"
              :props="items"
            >
              {{ items.row.answerOptions[0] }} |
              {{ items.row.answerOptions[1] }} |
              {{ items.row.answerOptions[2] }} |
              {{ items.row.answerOptions[3] }}
            </q-td>
            <q-td
              key="actions"
              :props="items"
            >
              <q-btn
                flat
                round
                color="secondary"
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
    label: 'Question',
    field: 'question',
    sortable: true
  },
  {
    name: 'question_id',
    align: 'right',
    label: 'QuestionID',
    field: '_id',
    sortable: true

  },
  {
    name: 'questionType',
    align: 'right',
    label: 'Type',
    field: 'questionType',
    sortable: true
  },
  {
    name: 'questionPart',
    align: 'right',
    label: 'Part',
    field: 'questionPart',
    sortable: true

  },
  {
    name: 'correctAnswer',
    align: 'right',
    label: 'Correct Answer',
    field: 'correctAnswer',
    sortable: true
  },
  {
    name: 'showAnswerOptions',
    align: 'right',
    label: 'Answer Options',
    field: 'answerOptions'
  },
  {
    name: 'actions',
    align: 'right',
    label: 'Actions'
  }
]
export default {
  name: 'DataSoalPage',
  setup () {
    const visible = ref(false)
    return {
      showAnswers: ref(false),
      filter: ref(''),
      columns,
      visible
    }
  },
  data () {
    return {
      rows: ref([]),
      exam: ref(''),
      questions: ref([])
    }
  },
  computed: {
    questionData () {
      return this.exam.questions
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.$store.dispatch('admin/getExamWithDataSoal', id).then(response => {
      this.exam = response.data.exam
      this.questions = response.data.exam.questions
      this.visible = true
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      this.visible = false
    })
  },
  methods: {
    showOptions () {
      this.showAnswers = true
    }
  }
}
</script>
