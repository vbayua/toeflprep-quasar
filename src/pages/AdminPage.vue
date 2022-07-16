<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-md q-mr-sm">
      <q-btn
        color="primary"
        icon="assignment"
        label="Data Ujian"
        to="/admin/exam-data"
        stack
        class="col-12 col-md text-h6"
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
      <q-btn
        color="primary"
        icon="groups"
        label="Data Mahasiswa"
        to="/admin/students-data"
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
