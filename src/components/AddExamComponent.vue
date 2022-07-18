<template>
  <q-dialog
    v-model="prompt"
    persistent
  >
    <q-card style="min-width: 350px">
      <q-form
        class="q-gutter-md"
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-card-section>
          <div class="text-h6">
            New Test
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            v-model="title"
            autofocus
            dense
            type="text"
            label="Test Title"
            @key.enter="prompt = false"
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
            label="Confirm"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'AddExamComponent',
  setup () {
    return {
      prompt: ref(false),
      title: ref('')
    }
  },
  methods: {
    async onSubmit () {
      try {
        if (!this.title) {
          this.$q.loading.show({
            message: 'Creating new test'
          })
        }
        const data = {
          title: this.title,
          status: 'inactive'
        }
        await this.$store.dispatch('admin/createExam', data)
        console.log(data)
      } catch (error) {
        this.$q.loading.hide()
        this.$q.notify({
          message: `Error : ${error.message}`,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
        location.reload()
      }
    }
  }
}
)
</script>
