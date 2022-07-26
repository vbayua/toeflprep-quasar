<template>
  <q-page class="flex flex-center">
    <div
      class="full-width"
      style="max-width: 360px"
    >
      <h5 class="text-center">
        Add User
      </h5>
      <q-card>
        <q-card-section>
          <q-form>
            <q-input
              ref="nameref"
              v-model="name"
              filled
              flat
              type="text"
              class="q-mb-md"
              label="Full name"
              :rules="namerules"
            />
            <q-input
              ref="usernameref"
              v-model="username"
              flat
              filled
              type="text"
              class="q-mb-md"
              label="Username"
              :rules="usernamerules"
            />
            <q-input
              ref="passwordref"
              v-model="password"
              flat
              filled
              type="password"
              class="q-mb-md"
              label="Password"
              :rules="passwordrules"
            />
            <q-input
              ref="emailref"
              v-model="email"
              flat
              filled
              type="email"
              class="q-mb-md"
              label="Email"
              :rules="emailrules"
            />
            <q-btn
              color="primary"
              class="full-width"
              label="Submit"
              type="submit"
              @click="handleRegister"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'RegisterPage',
  setup () {
    const name = ref(null)
    const nameref = ref(null)

    const email = ref(null)
    const emailref = ref(null)

    const username = ref(null)
    const usernameref = ref(null)

    const password = ref(null)
    const passwordref = ref(null)

    return {
      name,
      nameref,
      namerules: [
        val => !!val || '* Required'
      ],

      email,
      emailref,
      emailrules: [
        val => !!val || '* Required'
      ],

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
    // loggedIn () {
    //   return this.$store.state.auth.status.loggedIn
    // }
  },
  created () {
    // if (this.loggedIn) {
    //   this.$router.push('/home')
    // }
  },

  methods: {
    async handleRegister () {
      try {
        this.$q.loading.show({
          message: 'Registering User'
        })
        const user = {
          username: this.username,
          name: this.name,
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('auth/register', user)
        await this.$q.notify({
          message: 'Register successful!',
          icon: 'check',
          color: 'positive'
        })
        this.$router.push({ name: 'users' })
      } catch (error) {
        this.$q.loading.hide()
        this.$q.notify({
          message: `Error: ${error}`,
          color: 'negative'
        })
      }
    }
  }
}
</script>
