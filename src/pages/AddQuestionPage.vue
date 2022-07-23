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
            name="paragraphs"
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
            flat
            color="primary"
            label="Add Answer Options"
            @click.prevent="onClick"
          />
          <q-space />
          <q-select
            v-model="correctAnswerr"
            :options="answerOptions"
            hint="To add Correct Answer please click the button above after adding your options"
            label="Correct Answer"
            filled
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
            v-model="audiofile"
            name="audiofile"
            clearable
            filled
            accept=".mp3, audio/mpeg"
            hint="Only support .mp3 audio file"
            label="Audio File"
          />
          <!-- <q-input
            ref="audiofile"
            name="audiofile"
            type="file"
            label="audiofile"
            @update:model-value="val => { audiofile = val[0] }"
          /> -->
          <!-- <q-uploader
            color="teal"
            flat
            :factory="onSubmit"
            bordered
            max-files="1"
            style="max-width: 300px"
          /> -->
        </q-card-section>

        <q-card-section v-show="questionType">
          <div class="row">
            <q-btn
              class="full-width"
              flat
              color="secondary"
              label="Cancel"
              :to="{name: 'datasoal', params: { id: $route.params.id }}"
            />
            <q-btn
              class="full-width"
              type="submit"
              color="primary"
              label="Save"
            />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import AdminService from 'src/services/admin.service'
import { api } from 'src/boot/axios'
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
      paragraphs: ref(''),
      correctAnswer: ref(''),
      file_path: ref(null),
      partOptions: ['A', 'B', 'C'],
      // option: ref(''),
      audiofile: ref(null),
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
    checkFileType (files) {
      return files.filter(file => file.type === 'audio/mpeg')
    },
    onFileRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    async onSubmit () {
      try {
        this.$q.loading.show({
          message: 'Adding new Question'
        })
        const ansopts = [...this.answerOptions]

        if (this.audiofile) {
          const filename = this.audiofile
          const formData = new FormData()
          formData.append('audiofile', this.audiofile)
          await api.post('/azureBlob/upload', formData, {
            headers: {
              'Content-Type': 'multiform/form-data'
            }
          })

          // console.log(blobInfo)
          const fileinfo = await AdminService.getFileInfo(filename.name)
          const fileUrl = await fileinfo.data.blobUrl

          const data = {
            question: this.question,
            type: this.questionType,
            part: this.questionPart,
            paragraphs: this.paragraphs,
            audioUrl: fileUrl,
            answers: ansopts,
            correctAnswer: this.correctAnswerr,
            testExam: this.$route.params.id
          }

          await this.$store.dispatch('admin/addQuestion', data)
        } else {
          const data = {
            question: this.question,
            type: this.questionType,
            part: this.questionPart,
            paragraphs: this.paragraphs,
            audioUrl: '',
            answers: ansopts,
            correctAnswer: this.correctAnswerr,
            testExam: this.$route.params.id
          }

          await this.$store.dispatch('admin/addQuestion', data)
        }
        // console.log(filename.name)
        // console.log(data)
        // console.log(this.audiofile)
      } catch (error) {
        console.log(error)
        this.$q.loading.hide()
        this.$q.notify({
          message: error,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
        this.$router.back()
        this.$q.notify({
          message: 'Add Successful'
        })
      }
    }
  }
}
</script>
