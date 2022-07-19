<template>
  <q-dialog
    v-model="questionPrompt"
    persistent
  >
    <q-card style="min-width: 400px">
      <q-form
        class="q-gutter-md"
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-card-section>
          <div class="text-h6 text-center">
            Add Question
          </div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="questionType"
            :options="options"
            label="Question Type"
            filled
          />
        </q-card-section>`

        <q-card-section>
          <q-input
            v-model="question"
            type="text"
            label="Label"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'AddQuestionComponent',
  setup () {
    return {

    }
  }
}
</script>
