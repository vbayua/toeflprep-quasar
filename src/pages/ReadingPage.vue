<template>
  <q-page
    padding
    class="column"
  >
    <!--  -->
    <div
      v-if="questions.length > 0"
      class="row justify-center"
    >
      <div
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
            <div class="text-justify">
              {{ questions[current].paragraphs }}
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
    </div>
    <div v-else>
      NO DATA
      <q-btn
        flat
        dense
        color="primary"
        label="Back Home"
        to="/home"
      />
    </div>
    <q-dialog
      v-model="confirm"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <span>Are you sure?</span>
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
    return {
      minutes: ref(''),
      seconds: ref(''),
      response,
      answers
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    const examId = this.$route.params.id
    this.$store.dispatch('exam/getReadingQuestions', examId).then(response => {
      const shuffled = fisherYatesDurstenfeldKnuthShuffle(response.data.exam.questions)
      const reshuffled = fisherYatesDurstenfeldKnuthShuffle(shuffled)
      this.questions = reshuffled
      console.log(this.questions[0].answerOptions)
      this.maxpage = this.questions.length - 1
    }).catch(error => {
      console.log(error)
    })
    this.startTimer(60 * 30)
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
        let response = null
        let score = 0
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
        const date = new Date().toISOString().slice(0, 10)
        const data = {
          userId: this.$store.state.auth.user.id,
          examId,
          readingRaw: score,
          date,
          responses: obj
        }
        await this.$store.dispatch('exam/saveResult', data)
        await this.$router.push({ name: 'finishpage', params: { id: this.$route.params.id } })
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
