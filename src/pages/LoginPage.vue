<template>
  <q-page class="flex flex-center">
    <div
      class="full-width"
      style="max-width: 340px"
    >
      <h5 class="text-center">
        Login
      </h5>
      <q-card
        elevated
        bordered
      >
        <q-card-section>
          <q-form @submit="handleLogin">
            <q-input
              ref="usernameref"
              v-model="username"
              dense
              filled
              type="text"
              class="q-mb-auto"
              label="Username"
              :rules="usernamerules"
            />
            <q-input
              ref="passwordref"
              v-model="password"
              dense
              filled
              type="password"
              class="q-mb-auto"
              label="Password"
              :rules="passwordrules"
            />
            <q-btn
              type="submit"
              color="primary"
              class="full-width"
              label="Login"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import LoginForm from 'components/LoginForm.vue'
export default {
  name: 'LoginPage',
  components: LoginForm,
  setup () {
    const username = ref(null)
    const usernameref = ref(null)

    const password = ref(null)
    const passwordref = ref(null)

    return {
      username,
      usernameref,
      usernamerules: [
        val => !!val || '* Required'
      ],

      password,
      passwordref,
      passwordrules: [
        val => !!val || '* Required'
      ]
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.$router.push('/home')
    }
  },

  methods: {
    async handleLogin () {
      try {
        this.$q.loading.show({
          message: 'Authenticating'
        })
        const user = {
          username: this.username,
          password: this.password
        }
        await this.$store.dispatch('auth/login', user)
        await this.$router.push('/home')
      } catch (error) {
        this.$q.loading.hide()
        this.$q.notify({
          message: `Error : ${error.message}`,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
    }
  }

}
</script>
