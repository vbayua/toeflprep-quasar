<template>
  <q-page class="flex flex-center">
    <div
      class="full-width"
      style="max-width: 400px"
    >
      <q-card
        elevated
        bordered
        class="column"
      >
        <div class="q-mt-md text-center text-h5">
          <div class="text-h6 text-blue-10">
            TOEFL PREPARATION
          </div>
          <span class="text-subtitle1 text-blue-12">
            Log In
          </span>
        </div>
        <q-separator
          inset
          dark
        />
        <q-form
          class="q-gutter-md"
          @submit="handleLogin"
        >
          <q-card-section>
            <q-input
              ref="usernameref"
              v-model="username"
              filled
              type="text"
              class="q-mb-auto"
              label="Username"
              :rules="usernamerules"
            />
            <q-input
              ref="passwordref"
              v-model="password"
              filled
              type="password"
              class="q-mb-auto"
              label="Password"
              :rules="passwordrules"
            />
          </q-card-section>
          <q-card-section>
            <div class="column">
              <q-btn
                type="submit"
                color="primary"
                class="col"
                size="20px"
                label="Login"
              />
            </div>
          </q-card-section>
        </q-form>
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
    },
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  created () {
    if (this.loggedIn && this.currentUser.roles[0] === 'admin') {
      this.$router.push('/home')
    } else {
      this.$router.push('/admin/')
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
        console.log(this.currentUser.roles)
        if (this.currentUser.roles[0] === 'admin') {
          this.$router.push('/admin/home')
        } else {
          this.$router.push('/home')
        }
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
