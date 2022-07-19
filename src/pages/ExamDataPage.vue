<template>
  <q-page
    padding
  >
    <AddExamComponentVue v-model="prompt" />
    <div class="row q-mt-md q-ml-auto">
      <q-table
        title="Data Ujian TOEFL"
        :rows="rows"
        :columns="columns"
        row-key="title"
        class="full-width"
        style="min-height: 100vh"
      >
        <template #top-right>
          <q-btn
            color="primary"
            label="Tambah Data Ujian"
            @click="prompt = true"
          />
        </template>
        <template #body="items">
          <q-tr :props="items">
            <q-td
              key="title"
              :props="items"
            >
              {{ items.row.title }}
            </q-td>
            <q-td
              key="status"
              :props="items"
            >
              {{ items.row.status }}
            </q-td>

            <q-td
              key="actions"
              :props="items"
            >
              <!-- <router-link
                :to="{ path: '/admin/exam-data', params: { id: items.row._id }}"
              > -->
              <q-btn
                flat
                dense
                color="dark"
                icon-right="post_add"
                label="Data Soal"
                :to="{ name: 'datasoal', params: {id: items.row._id}}"
              />
              <!-- </router-link> -->

              <q-btn
                flat
                round
                color="secondary"
                icon="edit"
                dense
                @click.prevent="updatePrompt = true; onUpdateClick(items.row.title)"
              />

              <q-btn
                flat
                round
                color="negative"
                icon="delete"
                dense
                @click="confirm = true"
              />

              <q-dialog
                v-model="confirm"
                persistent
              >
                <q-card>
                  <q-card-section class="row items-center">
                    <span class="q-ml-sm">Are you sure?</span>
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
                      label="YES"
                      color="primary"
                      @click="deleteExam(items.row._id)"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <q-dialog
                v-model="updatePrompt"
                persistent
              >
                <q-card style="min-width: 350px">
                  <q-form
                    class="q-gutter-md"
                    @submit.prevent="updateExam(items.row._id)"
                  >
                    <q-card-section>
                      <div class="text-h6">
                        Edit Test Title
                      </div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                      <q-input
                        v-model="titleToUpdate"
                        autofocus
                        dense
                        type="text"
                        label="Test Title"
                      />
                    </q-card-section>
                    <q-card-actions
                      align="right"
                      class="text-primary"
                    >
                      <q-btn
                        v-close-popup
                        flat
                        label="Cancel"
                      />
                      <q-btn
                        v-close-popup
                        type="submit"
                        flat
                        label="Save"
                      />
                    </q-card-actions>
                  </q-form>
                </q-card>
              </q-dialog>
            </q-td>
          </q-tr>
        </template>
        <template #no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-black q-gutter-sm">
            <q-icon
              size="2em"
              name="sentiment_dissatisfied"
            />
            <span>
              {{ message }}
            </span>
            <q-icon
              size="2em"
              :name="filter ? 'filter_b_and_w' : icon"
            />
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
const columns = [
  {
    name: 'title',
    align: 'left',
    label: 'Test Title',
    field: 'title',
    sortable: true
  },
  {
    name: 'status',
    align: 'right',
    label: 'Status',
    field: 'status'
  },
  {
    name: 'actions',
    align: 'right',
    label: 'Actions',
    field: 'actions'
  }
]
import { ref } from 'vue'
import AddExamComponentVue from 'src/components/AddExamComponent.vue'
export default {
  name: 'ExamData',
  components: {
    AddExamComponentVue
  },
  setup () {
    return {
      prompt: ref(false),
      updatePrompt: ref(false),
      confirm: ref(false),
      title: ref(false),
      titleToUpdate: ref(''),
      columns
    }
  },
  data () {
    return {
      rows: ref([])
    }
  },
  computed: {
    exams () {
      return this.$store.state.exam
    }
  },
  mounted () {
    this.$store.dispatch('admin/getAllExam').then(response => {
      console.log(response.data)
      this.rows = response.data.exams
    })
  },
  methods: {
    toDataSoal (examId) {
      this.$router.push({
        name: 'datasoal',
        params: { id: examId }
      })
    },
    async deleteExam (examId) {
      try {
        this.$q.loading.show({
          message: 'Deleting'
        })
        await this.$store.dispatch('admin/deleteExam', examId)
      } catch (error) {
        this.$q.loading.hide()
        this.$q.notify({
          message: `Error : ${error.message}`,
          color: 'negative'
        })
      } finally {
        await this.$q.loading.hide()
        this.$q.notify({
          message: 'Delete successful',
          color: 'positive'
        })
        location.reload()
      }
    },
    async onUpdateClick (title) {
      this.titleToUpdate = title
    },
    async updateExam (examId) {
      try {
        if (!this.titleToUpdate) {
          this.$q.notify({
            message: 'Title Cannot Be Empty!',
            color: 'negative'
          })
          return this.$q.loading.hide()
        } else {
          this.$q.loading.show({
            message: 'Updating Test Title'
          })
          const data = {
            _id: examId,
            title: this.titleToUpdate,
            status: 'inactive'
          }
          await this.$store.dispatch('admin/updateExam', data)
        }
        // console.log(data)
      } catch (error) {
        this.$q.loading.hide()
        this.$q.notify({
          message: `Error : ${error.message}`,
          color: 'negative'
        })
      } finally {
        await this.$q.loading.hide()
        await this.$q.notify({
          message: 'Update successful',
          color: 'positive'
        })
        location.reload()
      }
    }
  }
}
</script>
