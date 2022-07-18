<template>
  <q-page
    class="row"
    padding
  >
    <div>
      <h2>Home</h2>
      <h3>Mahasiswa</h3>
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
