<template>
  <q-page
    padding
    class="column"
  >
    <!--  -->
    <div class="row justify-center">
      <div class="col-lg-auto">
        <!--  -->
        <q-card class="">
          <q-card-section>
            <span align="right"> Question {{ current + 1 }} of {{ maxpage + 1 }} </span>
          </q-card-section>
          <q-card-section>
            <div class="subtitle">
              Question :
            </div>
            {{ questions[current].question }}
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
            <!-- <q-radio
              v-model="response[current]"
              :val="questions[current].answerOptions[1]"
              :label="questions[current].answerOptions[1]"
            />
            <q-separator
              spaced
              inset
              vertical
              dark
            />
            <q-radio
              v-model="response[current]"
              :val="questions[current].answerOptions[2]"
              :label="questions[current].answerOptions[2]"
            />
            <q-separator
              spaced
              inset
              vertical
              dark
            />
            <q-radio
              v-model="response[current]"
              :val="questions[current].answerOptions[3]"
              :label="questions[current].answerOptions[3]"
            /> -->
          </q-card-section>
        </q-card>
      </div>
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
    <q-dialog
      v-model="confirm"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Finish and Submit Answers?</span>
        </q-card-section>
        <q-card-actions align="center">
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
  name: 'ExamPage',
  setup () {
    const questioned = [
      {
        _id: '120398213',
        question: '1lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium officia qui nam aspernatur molestiae quis ',
        questionType: 'Listening Comprehension',
        answerOptions: ['option1', 'option2', 'option3', 'option4'],
        correctAnswer: 'option1'
      },
      {
        _id: '128390120',
        question: '2lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium officia qui nam aspernatur molestiae quis ',
        questionType: 'Listening Comprehension',
        answerOptions: ['option11', 'option22', 'option33', 'option444'],
        correctAnswer: 'option33'
      },
      {
        _id: '912390129',
        question: '3lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium officia qui nam aspernatur molestiae quis ',
        questionType: 'Listening Comprehension',
        answerOptions: ['option111', 'option222', 'option333', 'option4444'],
        correctAnswer: 'option222'
      }
    ]
    const shuffled = fisherYatesDurstenfeldKnuthShuffle(questioned, true)
    const shuffledAgain = fisherYatesDurstenfeldKnuthShuffle(shuffled, true)
    const questions = ref(shuffledAgain)
    const current = ref(0)
    const isFirstIndex = ref(true)
    const isLastIndex = ref(false)
    const maxpage = questions.value.length - 1
    return {
      questions,
      maxpage,
      confirm: ref(false),
      isFirstIndex,
      isLastIndex,
      current
    }
  },
  data () {
    const response = ref([])
    const answers = ref([])
    const pageOf = ref(null)
    return {
      response,
      answers,
      pageOf
    }
  },
  computed: {
    return: {
      getCurrentPage () {
        return this.questions.forEach(element => {
          this.questions.indexOf(element.question)
        })
      }
    }
  },
  mounted () {
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
      // console.log(this.answers)
      try {
        this.confirm = true
        this.$q.loading.show({
          message: 'Submitting your answers'
        })
        const qs = await this.questions.map(question => question._id)
        const answerchoices = await this.response.map(answer => answer)
        const obj = []
        for (let index = 0; index < qs.length; index++) {
          const id = await qs[index]
          const choice = await answerchoices[index] ? answerchoices[index] : ''
          obj.push({
            qid: id,
            answerChoice: choice
          })
        }
      } catch (error) {
        this.$q.notify({
          message: error
        })
      } finally {
        this.$q.loading.hide()
      }
      // console.log(qs)
      // console.log(answerchoices)
      // console.log(obj)
    },
    onChange (event) {
      console.log(event.target.value)
    }
  }
}
</script>
