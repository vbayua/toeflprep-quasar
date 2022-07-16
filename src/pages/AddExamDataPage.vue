<template>
  <q-page
    padding
    class="flex flex-center"
  >
    <!-- content -->
    <div
      class="full-width"
      style="max-width: 400px"
    >
      <q-card class="column">
        <div class="q-mt-md text-center text-h5">
          <span>
            Tambah Data Ujian
          </span>
        </div>
        <q-separator
          inset
          dark
        />
        <q-form
          class="q-gutter-md"
          @submit="onSubmit"
          @reset="onReset"
        >
          <q-card-section>
            <q-input
              v-model="title"
              filled
              type="text"
              label="Test Title"
            />
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="date"
              type="date"
            />
          </q-card-section>
          <q-card-section>
            <div class="column">
              <q-btn
                label="Submit"
                type="submit"
                class="col"
                size="16px"
                color="primary"
              />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="col q-mt-sm"
              />
            </div>
          </q-card-section>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
