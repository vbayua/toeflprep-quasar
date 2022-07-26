<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div>
          <strong>
            Laporan Hasil
          </strong>
        </div>
      </q-card-section>
    </q-card>
    <div>
      <q-markup-table
        dense
        flat
        bordered
        square
      >
        <thead>
          <tr>
            <th class="text-center">
              <strong>Name</strong>
            </th>
            <th class="text-center">
              <strong>Listening (RAW)</strong>
            </th>
            <th class="text-center">
              <strong>Structure & Written Expression (RAW)</strong>
            </th>
            <th class="text-center">
              <strong>Reading (RAW)</strong>
            </th>
            <th class="text-center">
              <strong>Listening (SCALED)</strong>
            </th>
            <th class="text-center">
              <strong>Structure & Written Expression (SCALED)</strong>
            </th>
            <th class="text-center">
              <strong>Reading (SCALED)</strong>
            </th>
            <th class="text-center">
              <strong>TOTAL (RAW)</strong>
            </th>
            <th class="text-center">
              <strong>TOTAL (SCALED)</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="result in results"
            :key="result.date"
          >
            <td class="text-center text-black text-bold">
              {{ result.userId.name }}
            </td>
            <td class="text-center text-black text-bold">
              {{ result.listeningRaw }}
            </td>
            <td class="text-center text-black text-bold">
              {{ result.structureRaw }}
            </td>
            <td class="text-center text-black text-bold">
              {{ result.readingRaw }}
            </td>
            <td class="text-center text-black text-bold">
              {{ result.listeningScaled }}
            </td>
            <td class="text-center text-black text-bold">
              {{ result.structureScaled }}
            </td>
            <td class="text-center text-black text-bold">
              {{ result.readingScaled }}
            </td>
            <td class="text-center text-black text-bold">
              {{ result.totalRaw }}
            </td>
            <td class="text-center text-black text-bold">
              {{ result.totalScaled }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import adminService from 'src/services/admin.service'

const columns = [
  {
    name: 'username',
    align: 'left',
    label: 'Username',
    field: 'username',
    sortable: true,
    format: val => `${val}`
  },
  {
    name: 'name',
    align: 'left',
    label: 'Name',
    field: 'name',
    sortable: true,
    format: val => `${val}`
  },
  {
    name: 'listeningRaw',
    align: 'left',
    label: 'Listening Raw',
    field: 'listeningRaw',
    sortable: true,
    format: val => `${val}`

  },
  {
    name: 'structureRaw',
    align: 'left',
    label: 'Structure Raw',
    field: 'structureRaw',
    sortable: true,
    format: val => `${val}`

  },
  {
    name: 'readingRaw',
    align: 'left',
    label: 'Reading Raw',
    field: 'readingRaw',
    sortable: true,
    format: val => `${val}`

  },
  {
    name: 'listeningScaled',
    align: 'left',
    label: 'Listening Scaled',
    field: 'listeningScaled',
    sortable: true,
    format: val => `${val}`

  },
  {
    name: 'structureScaled',
    align: 'left',
    label: 'Structure Scaled',
    field: 'structureScaled',
    sortable: true,
    format: val => `${val}`

  },
  {
    name: 'readingScaled',
    align: 'left',
    label: 'Reading Scaled',
    field: 'readingScaled',
    sortable: true,
    format: val => `${val}`

  },
  {
    name: 'totalRaw',
    align: 'left',
    label: 'Raw Score',
    field: 'totalRaw',
    sortable: true,
    format: val => `${val}`

  },
  {
    name: 'totalScaled',
    align: 'left',
    label: 'Scaled Score',
    field: 'totalScaled',
    sortable: true,
    format: val => `${val}`

  },
  {
    name: 'date',
    align: 'left',
    label: 'Date',
    field: 'date',
    format: val => `${val}`

  }
]

export default {
  name: 'PrintReport',
  setup () {
    return {
      filter: ref(''),
      columns,
      prompt: ref(true)
    }
  },
  data () {
    return {
      results: ref([])
    }
  },
  created () {
    document.body.style.zoom = '80%'
    this.printReport()
  },
  mounted () {
    const examId = this.$route.params.id
    console.log(examId)
    adminService.getExamResults(examId).then(
      response => {
        // console.log(response.data.result)
        this.results = response.data.result
        console.log(this.results)
      },
      error => {
        console.log(error)
      }
    )
  },
  methods: {
    async printReport () {
      setTimeout(() => {
        window.print()
        this.$router.push({ name: 'resultlist', params: this.$route.params.id })
      }, 7000)
    }
  }
}
</script>
