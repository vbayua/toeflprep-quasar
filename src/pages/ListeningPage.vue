<template>
  <q-page
    padding
    class="column"
  >
    <!--  -->
    <div class="row justify-center">
      <div
        v-if="questions.length > 0"
        class="full-width"
      >
        <q-card class="full-width">
          <q-card-section>
            <div class="text-h6">
              {{ questions[current].questionType }}
            </div>
            <span align="right"> Question {{ current + 1 }} of {{ maxpage + 1 }} </span>
          </q-card-section>
          <q-card-section>
            <div class="subtitle">
              Question :
            </div>
            {{ questions[current].question }}
          </q-card-section>
          <q-card-section>
            <audio controls>
              <source
                :src="questions[current].audioUrl"
                type="audio/mpeg"
              >
              Your browser does not support the <code>audio</code> element.
            </audio>
          </q-card-section>
          <q-card-section
            v-for="(answerOpts, index) in questions[current].answerOptions"
            :key="index"
          >
            <q-radio
              v-model="response[current]"
              :val="questions[current].answerOptions[index]"
              :label="questions[current].answerOptions[index]"
            />
            <q-separator
              spaced
              inset
              vertical
              dark
            />
          </q-card-section>
        </q-card>
      </div>
      <div v-else>
        NO DATA
      </div>
      {{ response }}
    </div>
    <div class="column self-center">
      <div class="row">
        <q-btn
          v-show="current > 0"
          color="primary"
          icon="arrow_left"
          label="PREVIOUS"
          @click.prevent="previousQuestion"
        />
        <q-btn
          v-show="current !== maxpage"
          color="primary"
          icon-right="arrow_right"
          label="NEXT"
          @click.prevent="nextQuestion"
        />
        <q-separator
          spaced
          inset
          vertical
          dark
        />
        <q-btn
          v-show="current === maxpage"
          color="accent"
          icon="check"
          label="Finish"
          @click.prevent="onFinish"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { fisherYatesDurstenfeldKnuthShuffle } from '../services/fisherYates'
export default {
  name: 'StructurePage',
  setup () {
    const current = ref(0)
    const isFirstIndex = ref(true)
    const isLastIndex = ref(false)
    // const maxpage = questions.value.length - 1
    return {
      isFirstIndex,
      // maxpage,
      isLastIndex,
      questions: ref([]),
      ansopts: ref([]),
      maxpage: ref(0),
      current
    }
  },
  data () {
    const response = ref([])
    const answers = ref([])
    return {
      response,
      answers
    }
  },
  computed: {
  },
  created () {
    // this.fetchQuestions()
  },
  mounted () {
    const examId = this.$route.params.id
    this.$store.dispatch('exam/getListeningQuestions', examId).then(response => {
      const shuffled = fisherYatesDurstenfeldKnuthShuffle(response.data.exam.questions)
      const reshuffled = fisherYatesDurstenfeldKnuthShuffle(shuffled)
      this.questions = reshuffled
      console.log(this.questions[0].answerOptions)
      this.maxpage = this.questions.length - 1
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    nextQuestion () {
      if (this.current === this.maxpage) {
        this.isLastIndex = true
        return this.$q.notify({
          message: 'You are already at the last page'
        })
      } else {
        this.current++
        this.isFirstIndex = false
      }
    },
    previousQuestion () {
      if (this.current > 0) {
        this.current--
      } else {
        return this.$q.notify({
          message: 'You are already at the first page'
        })
      }
    },
    async onFinish () {
      try {
        this.$q.loading.show({
          message: 'Submitting answers'
        })
        const examId = this.$route.params.id
        const qs = this.questions.map(question => question._id)
        const ca = this.questions.map(question => question.correctAnswer)
        const answerchoices = this.response.map(answer => answer)
        const obj = []
        for (let index = 0; index < qs.length; index++) {
          const id = await qs[index]
          const choice = await answerchoices[index] ? answerchoices[index] : ''
          if (answerchoices[index] === ca[index]) {
            const response = {
              qid: id,
              testExam: examId,
              answerChoice: choice,
              isCorrect: true
            }
            obj.push(response)
          } else {
            const response = {
              qid: id,
              testExam: examId,
              answerChoice: choice,
              isCorrect: false
            }
            obj.push(response)
          }
        }
        console.log(qs)
        console.log(answerchoices)
        console.log(obj)
        // Insert response to response document
        // Insert score to
        // await this.$router.push({ name: 'structurepage', params: { id: this.$route.params } })
      } catch (error) {
        this.$q.notify({
          message: error
        })
      } finally {
        this.$q.loading.hide()
      }
    },
    onChange (event) {
      console.log(event.target.value)
    }
  }
}
</script>
