<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </q-card-section>
    </q-card>
    <div>
      <q-table
        title="Data Hasil Mahasiswa"
        :rows="results"
        :columns="columns"
        row-key="date"
        separator="cells"
      >
        <template #top-right>
          <q-input
            v-model="filter"
            borderless
            dense
            debounce="300"
            placeholder="Search"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-separator
            spaced
            inset
            vertical
            dark
          />
          <q-btn
            color="primary"
            icon-right="archive"
            label="Print Report"
            no-caps
            :to="{name: 'printreport', params: { id: $route.params.id }}"
          />
        </template>
        <template #body="items">
          <q-tr :props="items">
            <q-td
              key="username"
              :props="items"
            >
              {{ items.row.userId.username }}
            </q-td>
            <q-td
              key="name"
              :props="items"
            >
              {{ items.row.userId.name }}
            </q-td>
            <q-td
              key="listeningRaw"
              :props="items"
            >
              {{ items.row.listeningRaw }}
            </q-td>
            <q-td
              key="structureRaw"
              :props="items"
            >
              {{ items.row.structureRaw }}
            </q-td>
            <q-td
              key="readingRaw"
              :props="items"
            >
              {{ items.row.readingRaw }}
            </q-td>
            <q-td
              key="listeningScaled"
              :props="items"
            >
              {{ items.row.listeningScaled }}
            </q-td>
            <q-td
              key="structureScaled"
              :props="items"
            >
              {{ items.row.structureScaled }}
            </q-td>
            <q-td
              key="readingScaled"
              :props="items"
            >
              {{ items.row.readingScaled }}
            </q-td>
            <q-td
              key="totalRaw"
              :props="items"
            >
              {{ items.row.totalRaw }}
            </q-td>
            <q-td
              key="totalScaled"
              :props="items"
            >
              {{ items.row.totalScaled }}
            </q-td>
            <q-td
              key="date"
              :props="items"
            >
              {{ items.row.date }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { exportFile } from 'quasar'
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

function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export default {
  name: 'UserResultss',
  setup () {
    return {
      filter: ref(''),
      columns
    }
  },
  data () {
    return {
      results: ref([])
    }
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
    exportTable () {
      // naive encoding to csv format
      const content = [columns.map(col => wrapCsvValue(col.label))].concat(
        this.results.map(row => columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format,
          row
        )).join(','))
      ).join('\r\n')
      const reportName = new Date().toISOString()
      const status = exportFile(
        `${reportName}-toeflprep-report.csv`,
        // eslint-disable-next-line space-infix-ops, quotes
        "\ufeff"+ content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  }
}
</script>
