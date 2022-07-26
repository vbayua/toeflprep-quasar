<template>
  <q-page
    padding
    class="flex flex-center"
  >
    <q-card style="max-width: 400px">
      <q-card-section>
        <div class="text-h5">
          Test Complete
        </div>
      </q-card-section>
      <q-card-actions
        vertical
        align="center"
      >
        <q-btn
          color="primary"
          icon="check"
          label="Back to Home"
          to="/home"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'FinishPage'
}
</script>
