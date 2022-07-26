<template>
  <q-page padding>
    <q-dialog
      v-model="userinfoprompt"
      persistent
    >
      <q-card flat>
        <q-card-section class="row items-center">
          <q-input
            v-model="name"
            type="text"
            label="Your Name"
          />
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="major"
            :options="majoroptions"
            label="Jurusan"
            filled
          />
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="nim"
            type="number"
            label="NIM"
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            :to="{name: 'result', params: { id: $route.params.id }}"
          />
          <q-btn
            v-close-popup
            flat
            label="Print"
            icon="print"
            color="primary"
            @click.prevent="print"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div
      v-for="(result, index) in results"
      :key="index"
    >
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5 text-center text-uppercase">
            Certificate of Completion
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-center">
            {{ name }}
            <q-separator
              spaced
              inset
              vertical
              dark
            />
            <div>
              {{ major }}
            </div>
            <span class="text-subtitle2">
              NIM: {{ nim }}
            </span>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="">
            <q-markup-table
              bordered
              square
              separator="cell"
            >
              <thead>
                <tr>
                  <th class="text-center text-bold">
                    <strong>Section</strong>
                  </th>
                  <th class="text-center text-bold">
                    <strong>Score</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    Listening Comprehension
                  </td>
                  <td class="text-center">
                    {{ result.listeningScaled }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center">
                    Structure and Written Expression
                  </td>
                  <td class="text-center">
                    {{ result.structureScaled }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center">
                    Reading Comprehension
                  </td>
                  <td class="text-center">
                    {{ result.readingScaled }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center">
                    <strong>Total</strong>
                  </td>
                  <td class="text-center">
                    {{ result.totalScaled }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import examService from 'src/services/exam.service'
import { ref } from 'vue'

export default {
  name: 'PrintResult',
  setup () {
    return {
      userinfoprompt: ref(true),
      name: ref(''),
      nim: ref(''),
      major: ref(''),
      majoroptions: ref([
        'S1 Teknik Informatika',
        'S1 Sistem Informasi',
        'S1 Desain Komunikasi Visual',
        'D3 Akuntansi',
        'D3 Manajemen Informatika'
      ])
    }
  },
  data () {
    return {
      results: ref([])
    }
  },
  mounted () {
    const data = {
      userId: this.$store.state.auth.user.id,
      examId: this.$route.params.id
    }
    examService.getUserExamResult(data.userId, data.examId).then(
      response => {
        console.log(response.data.result)
        this.results.push(response.data.result)
      },
      error => {
        console.log(error)
      }
    )
    this.userinfoprompt = true
    console.log(this.results)
  },
  methods: {
    async print () {
      this.userinfoprompt = false
      setTimeout(() => {
        this.printPage()
      }, 5000)
    },
    async printPage () {
      window.print()
    }
  }
}
</script>
