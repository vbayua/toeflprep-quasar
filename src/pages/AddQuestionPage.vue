<template>
  <q-page
    padding
    class="flex flex-center"
  >
    <!--  -->
    <q-card class="full-width">
      <q-form
        class="q-gutter-md"
        @submit.prevent="onSubmit"
        @reset="onReset"
      >
        <q-card-section>
          <div class="text-h6 text-center">
            Tambah Data Soal
          </div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="questionType"
            label="Select Question Type"
            transition-show="jump-up"
            transition-hide="jump-up"
            filled
            :options="options"
          />
        </q-card-section>

        <q-card-section v-show="questionType">
          <q-input
            v-model="question"
            type="text"
            label="Question"
          />
        </q-card-section>

        <q-card-section v-show="questionType === 'Reading Comprehension'">
          <q-input
            v-model="paragraphs"
            type="textarea"
            label="Reading Paragraph"
          />
        </q-card-section>

        <q-card-section v-show="questionType">
          <q-input
            v-model="option1"
            type="text"
            label="Enter answer"
            dense
          >
            <template #prepend>
              <small>A</small>
            </template>
          </q-input>

          <q-input
            v-model="option2"
            type="text"
            label="Enter answer"
            dense
          >
            <template #prepend>
              <small>B</small>
            </template>
          </q-input>

          <q-input
            v-model="option3"
            type="text"
            label="Enter answer"
            dense
          >
            <template #prepend>
              <small>C</small>
            </template>
          </q-input>

          <q-input
            v-model="option4"
            type="text"
            label="Enter answer"
            dense
          >
            <template #prepend>
              <small>D</small>
            </template>
          </q-input>
          <q-btn
            color="primary"
            label="Click to Add Answer Options"
            @click.prevent="onClick"
          />
        </q-card-section>

        <q-card-section v-show="answerIsAdded">
          <q-select
            v-model="correctAnswerr"
            :options="answerOptions"
            label="Correct Answer"
            filled
            dense
          />
        </q-card-section>

        <q-card-section v-show="questionType === 'Listening Comprehension'">
          <q-select
            v-model="questionPart"
            transition-show="jump-up"
            transition-hide="jump-up"
            label="Question Part"
            filled
            :options="partOptions"
          />
        </q-card-section>

        <q-card-section v-show="questionType === 'Listening Comprehension'">
          <q-file
            v-model="audio"
            clearable
            filled
            label="Audio File"
          />
        </q-card-section>

        <q-card-section v-show="questionType">
          <div class="row">
            <q-btn
              type="submit"
              color="primary"
              label="Save"
            />
            <q-btn
              flat
              color="secondary"
              label="Cancel"
            />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'AddQuestionPage',
  setup () {
    return {
      question: ref(''),
      questionType: ref(null),
      options: [
        'Listening Comprehension', 'Structure and Written', 'Reading Comprehension'
      ],
      questionPart: ref(''),
      correctAnswer: ref(''),
      partOptions: ['A', 'B', 'C'],
      // option: ref(''),
      audio: ref(''),
      option1: ref('Option 1'),
      option2: ref('Option 2'),
      option3: ref('Option 3'),
      option4: ref('Option 4'),
      correctAnswerr: ref(null),
      answerIsAdded: ref(false)
      // answers: ref([this.option1, this.option2, this.option3, this.option4]),
    }
  },
  data () {
    return {
      answer: ref(''),
      answerOptions: ref([])
      // answers: []
    }
  },
  methods: {
    async onClick () {
      if (this.answerOptions.length > 0) {
        this.answerOptions = []
        this.answerOptions.push(this.option1, this.option2, this.option3, this.option4)
      } else {
        this.answerOptions.push(this.option1, this.option2, this.option3, this.option4)
      }
      this.answerIsAdded = true
      // const answers = [this.option1, this.option2, this.option3, this.option4]
      // console.log(this.answerOptions)
    },
    async onSubmit () {
      try {
        this.$q.loading.show({
          message: 'Creating new Question'
        })
        const ansopts = [...this.answerOptions]
        const data = {
          question: this.question,
          type: this.questionType,
          part: this.questionPart,
          imageUrl: '',
          audioUrl: '',
          answers: ansopts,
          correctAnswer: this.correctAnswerr,
          testExam: this.$route.params.id
        }
        console.log(ansopts)
        console.log(data)
        await this.$store.dispatch('admin/addQuestion', data)
      } catch (error) {
        console.log(error)
      } finally {
        this.$q.loading.hide()
        this.$router.back()
      }
    }
  }
}
</script>
