<template>
  <q-page
    padding
    class="flex flex-center"
  >
    <!-- content -->
    <div class="column q-gutter-md q-mr-sm">
      <q-btn
        color="primary"
        icon="assignment"
        label="Data Ujian"
        to="/admin/exam-data"
        stack
        class="col-12 col-md text-h6"
        style="width: 300px;max-width: 300px"
        @click="onClick"
      />

      <q-btn
        color="primary"
        icon="assignment_turned_in"
        label="Data Hasil"
        to="/admin/results-data"
        stack
        class="col-12 col-md text-h6"
        @click="onClick"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AdminPage'
}
</script>
