<template>
  <q-page padding>
    <!-- content -->
    <h2>User Board</h2>
    <h5>{{ content }}</h5>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import UserService from '../services/user.service'

export default defineComponent({
  name: 'BoardUser',
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    UserService.getUserBoard().then(
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
