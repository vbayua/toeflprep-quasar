<template>
  <q-page padding>
    <div v-if="results !== null">
      <div
        v-for="(result, index) in results"
        :key="index"
      >
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h5">
              {{ result.examId.title ? result.examId.title : 'No data' }}
            </div>
            <div class="text-subtitle2">
              {{ result.date }}
            </div>
          </q-card-section>
          <q-card-section>
            <div>
              NIM : {{ result.userId.username ? result.userId.username : 'No data' }}
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
                      {{ result.listeningScaled ? result.listeningScaled : 'No data' }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      Structure and Written Expression
                    </td>
                    <td class="text-center">
                      {{ result.structureScaled ? result.structureScaled : 'No data' }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      Reading Comprehension
                    </td>
                    <td class="text-center">
                      {{ result.readingScaled ? result.readingScaled : 'No data' }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <strong>Total</strong>
                    </td>
                    <td class="text-center">
                      {{ result.totalScaled ? result.totalScaled : 'No data' }}
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
      </div>
    </div>
    <div v-else>
      <q-btn
        flat
        dense
        color="primary"
        icon="arrow_left"
        label="Back"
        to="/home"
      />
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
        this.results.push(response.data.result)
      },
      error => {
        console.log(error)
        this.$q.notify({
          message: 'No Data',
          color: 'negative'
        })
        this.$router.push({ name: 'home' })
      }
    )
  },
  methods: {
    async print () {
      window.print()
    }
  }
}
</script>
