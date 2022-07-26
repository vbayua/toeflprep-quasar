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
              @click.prevent="setActive(exam._id)"
            />
            <q-btn
              flat
              color="secondary"
              label="Set as Inactive"
              @click.prevent="setInactive(exam._id)"
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
              key="questionType"
              :props="items"
            >
              {{ items.row.questionType }}
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
                :to="{name: 'editquestionform', params: { id: exam._id, qid: items.row._id }}"
              />

              <q-btn
                flat
                round
                color="negative"
                icon="delete"
                dense
                @click.prevent="onDelete(items.row._id)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import AdminService from 'src/services/admin.service'
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
    name: 'questionType',
    align: 'right',
    label: 'Type',
    field: 'questionType',
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
    },

    async onDelete (id) {
      try {
        await AdminService.deleteQuestion(id)
        location.reload()
      } catch (error) {
        console.log(error)
      }
    },

    async setInactive (examId) {
      try {
        const status = 'inactive'
        await AdminService.updateExamStatus(examId, status)
        location.reload()
      } catch (error) {
        this.$q.notify({
          message: error.message,
          color: 'negative'
        })
      }
    },

    async setActive (examId) {
      try {
        this.$q.loading.show({
          message: 'Processing'
        })
        const listeningQuestions = await this.$store.dispatch('exam/getListeningQuestions', examId)
        const structureQuestions = await this.$store.dispatch('exam/getStructureQuestions', examId)
        const readingQuestions = await this.$store.dispatch('exam/getReadingQuestions', examId)

        const listeningAmount = listeningQuestions.data.exam.questions.length
        const structureAmount = structureQuestions.data.exam.questions.length
        const readingAmount = readingQuestions.data.exam.questions.length

        const checkListen = await this.checkListening(listeningAmount)
        const checkStruct = await this.checkStructure(structureAmount)
        const checkRead = await this.checkReading(readingAmount)

        if (checkListen && checkStruct && checkRead) {
          const status = 'active'
          await AdminService.updateExamStatus(examId, status)
          this.$q.notify({
            message: 'Test Published',
            color: 'primary'
          })
          location.reload()
        }
      } catch (error) {
        this.$q.loading.hide()
        this.$q.notify({
          message: `Error : ${error.message}`,
          color: 'negative'
        })
      } finally {
        await this.$q.loading.hide()
      }
    },

    async checkListening (listeningAmount) {
      if (listeningAmount <= 0 || listeningAmount > 30 || listeningAmount < 30) {
        this.$q.notify({
          message: 'Listening Questions must not be empty or less than 30'
        })
        return false
      } else if (listeningAmount === 30) {
        return true
      }
    },

    async checkStructure (structureAmount) {
      if (structureAmount <= 0 || structureAmount > 25 || structureAmount < 25) {
        this.$q.notify({
          message: 'Structure and Written Questions must not be empty or less than 30'
        })
        return false
      } else if (structureAmount === 25) {
        return true
      }
    },

    async checkReading (readingAmount) {
      if (readingAmount <= 0 || readingAmount > 40 || readingAmount < 40) {
        this.$q.notify({
          message: 'Reading Questions must not be empty or less than 30'
        })
        return false
      } else if (readingAmount === 40) {
        return true
      }
    }
  }
}
</script>
