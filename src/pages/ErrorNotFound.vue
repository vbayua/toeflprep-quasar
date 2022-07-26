<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div
        class="text-h2"
        style="opacity:.4"
      >
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        label="Go Home"
        no-caps
        @click="goHome"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound',
  computed: {
    userRoles () {
      return this.$store.state.auth.user.roles[0]
    }
  },
  methods: {
    async goHome () {
      if (this.userRoles === 'admin') {
        this.$router.push('/admin')
      } else {
        this.$router.push('/home')
      }
    }
  }
})
</script>
