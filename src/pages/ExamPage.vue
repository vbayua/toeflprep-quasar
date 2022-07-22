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
            {{ questions[current]._id }}
            {{ questions[current].question }}
          </q-card-section>
          <q-card-section>
            <q-radio
              v-model="response[current]"
              :val="questions[current].answerOptions[0]"
              :label="questions[current].answerOptions[0]"
            />
            <q-separator
              spaced
              inset
              vertical
              dark
            />
            <q-radio
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
            />
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
        <q-btn
          v-show="current === maxpage"
          color="primary"
          icon="check"
          label="Finish"
          @click="onClick"
        />
      </div>
    </div>
    {{ questions[current].answerOptions }}
    {{ response }}
    <span align="right"> {{ current + 1 }} / {{ maxpage + 1 }} </span>
    <!-- <div class="q-pa-lg self-center">
      <q-pagination
        v-model="current"
        color="black"
        :max="maxpage"
        :max-pages="6"
        :boundary-numbers="true"
      />
    </div> -->
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExamPage',
  setup () {
    const questions = ref([
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
    ])
    const current = ref(0)
    const isFirstIndex = ref(true)
    const isLastIndex = ref(false)
    const maxpage = questions.value.length - 1
    return {
      questions,
      maxpage,
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
      getCurrentQuestion () {
        // eslint-disable-next-line prefer-const
        let question = this.questions[this.getCurrentQuestion]
        question.index = this.current
        return question
      },
      getCurrentPage () {
        return this.questions.forEach(element => {
          this.questions.indexOf(element.question)
        })
      }
    }
  },
  watch: {
    response: function (newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },
  mounted () {
    this.pageOf = this.getCurrentPage
  },
  methods: {
    nextQuestion (questionId, answerChoice) {
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
    onClick () {
      // console.log(this.answers)
      const qs = this.questions.map(question => question._id)
      const answerchoices = this.response.map(answer => answer)
      const obj = []
      for (let index = 0; index < qs.length; index++) {
        const id = qs[index]
        const choice = answerchoices[index] ? answerchoices[index] : ''
        obj.push({
          qid: id,
          answerChoice: choice
        })
      }
      console.log(qs)
      console.log(answerchoices)
      console.log(obj)
    },
    onChange (event) {
      console.log(event.target.value)
    }
  }
}
</script>
