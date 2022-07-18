<template>
  <q-dialog
    v-model="updatePrompt"
    persistent
  >
    <q-card style="min-width: 350px">
      <q-form
        class="q-gutter-md"
        @submit.prevent="onSubmit"
        @reset="onReset"
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
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UpdateExamComponent',
  setup () {
    return {
      updatePrompt: ref(false),
      titleToUpdate: ref('')
    }
  },
  methods: {
    async onSubmit () {
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
})
</script>
