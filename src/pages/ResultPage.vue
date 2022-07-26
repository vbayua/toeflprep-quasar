<template>
  <q-page padding>
    <div
      v-for="(result, index) in results"
      :key="index"
    >
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5">
            {{ result.examId.title }}
          </div>
          <div class="text-subtitle2">
            {{ result.date }}
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            NIM : {{ result.userId.username }}
          </div>
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
            <q-btn
              color="primary"
              icon="print"
              label="Certificate"
              :to="{name: 'printresult', params: { id: $route.params.id }}"
            />
          </div>
        </q-card-section>
      </q-card>
      {{ result.totalScaled }}
    </div>
  </q-page>
</template>

<script>
import examService from 'src/services/exam.service'
import { ref } from 'vue'

// const columns = [
//   {
//     name: 'title',
//     align: 'left',
//     label: 'Test Title',
//     field: 'title',
//     sortable: true
//   },
//   {
//     name: 'status',
//     align: 'right',
//     label: 'Status',
//     field: 'status'
//   }
// ]

export default {
  name: 'UserResult',
  setup () {
    return {}
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
    console.log(this.results)
  },
  methods: {
    async print () {
      window.print()
    }
  }
}
</script>
