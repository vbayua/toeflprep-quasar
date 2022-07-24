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
            <div class="row justify-between">
              <div class="self-end">
                <span align="left"> Question {{ current + 1 }} of {{ maxpage + 1 }} </span>
              </div>
              <div class="self-start">
                <span align="right">Test Duration: {{ minutes }}:{{ seconds }}s</span>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="subtitle">
              Question :
            </div>
            {{ questions[current].question }}
          </q-card-section>
          <q-card-section
            v-for="(answerOpts, index) in shuffledOptions"
            :key="index"
          >
            <q-radio
              v-model="response[current]"
              :val="questions[current].answerOptions[answerOpts]"
              :label="questions[current].answerOptions[answerOpts]"
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
          @click.prevent="onFinishConfirm"
        />
      </div>
    </div>
    <q-dialog
      v-model="confirm"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <span>Finish section and proceed to next section?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Cancel"
            color="primary"
          />
          <q-btn
            v-close-popup
            flat
            label="Yes"
            color="primary"
            @click.prevent="onFinish"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    const opts = fisherYatesDurstenfeldKnuthShuffle([0, 1, 2, 3])
    const shuffledOptions = ref(opts)
    return {
      isFirstIndex,
      // maxpage,
      isLastIndex,
      questions: ref([]),
      ansopts: ref([]),
      shuffledOptions,
      confirm: ref(false),
      maxpage: ref(0),
      current
    }
  },
  data () {
    const response = ref([])
    const answers = ref([])
    // const questionData = ref([])
    // const maxpage = questionData.value.length - 1
    return {
      response,
      intervalId: 0,
      minutes: ref(''),
      seconds: ref(''),
      // questionData,
      answers
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    const examId = this.$route.params.id
    this.$store.dispatch('exam/getStructureQuestions', examId).then(response => {
      const shuffled = fisherYatesDurstenfeldKnuthShuffle(response.data.exam.questions, true)
      const reshuffled = fisherYatesDurstenfeldKnuthShuffle(shuffled, true)
      this.questions = reshuffled
      console.log(this.questions[0].answerOptions)
      this.maxpage = this.questions.length - 1
    }).catch(error => {
      console.log(error)
    })
    this.startTimer(60 * 20)
    // this.fetchQuestions()
  },
  beforeUnmount () {
    clearInterval(this.intervalId)
  },
  methods: {
    startTimer (duration, display) {
      let timer = duration,
        // eslint-disable-next-line no-unused-vars
        minutes,
        // eslint-disable-next-line no-unused-vars
        seconds
      this.intervalId = setInterval(() => {
        this.minutes = parseInt(timer / 60, 10)
        this.seconds = parseInt(timer % 60, 10)

        this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes
        this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds

        if (--timer < 0) {
          this.$q.notify({
            message: 'Time out, proceed to next section',
            color: 'secondary'
          })
          this.onFinish()
          clearInterval(this.intervalId)
        }
      }, 1000)
    },
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
    onFinishConfirm () {
      this.confirm = true
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
        let score = 0
        let response = null
        const obj = []
        for (let index = 0; index < qs.length; index++) {
          const id = await qs[index]
          const choice = await answerchoices[index] ? answerchoices[index] : ''
          if (answerchoices[index] === ca[index]) {
            response = {
              userId: this.$store.state.auth.user.id,
              questionId: id,
              examId,
              answerChoice: choice,
              isCorrect: true
            }
            score++
            obj.push(response)
          } else {
            response = {
              userId: this.$store.state.auth.user.id,
              questionId: id,
              examId,
              answerChoice: choice,
              isCorrect: false
            }
            obj.push(response)
          }
        }
        const data = {
          userId: this.$store.state.auth.user.id,
          examId,
          structureRaw: score,
          responses: obj
        }
        console.log(data)
        console.log(obj)
        // await examService.saveNestedResponses(data)
        await this.$store.dispatch('exam/saveResult', data)
        await this.$router.push({ name: 'readingpage', params: { id: this.$route.params.id } })
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
