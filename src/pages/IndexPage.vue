<template>
  <q-page
    class="flex flex-center"
    padding
  >
    <!-- content -->
    <div class="column q-gutter-md q-mr-sm">
      <q-btn
        color="primary"
        icon="article"
        label="Preparation Test"
        :to="{ name: 'examlist' }"
        stack
        class="col-12 col-md text-h6"
        style="width: 300px;max-width: 300px"
        @click="onClick"
      />

      <q-btn
        color="primary"
        icon="assignment_turned_in"
        label="Hasil"
        :to="{ name: 'results' }"
        stack
        class="col-12 col-md text-h6"
        @click="onClick"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import UserService from '../services/user.service'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data
      },
      (error) => {
        this.content = error.toString()
      }
    )
  }
})
</script>
