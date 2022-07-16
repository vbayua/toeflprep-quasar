<template>
  <q-page padding>
    <q-card class="my-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">
      <q-card-section>
        <div class="text-h6">
          Profile
        </div>
        <div class="text-subtitle2">
          of {{ currentUser.username }}
        </div>
      </q-card-section>
      <q-card-section>
        <strong>Token</strong>
        {{ currentUser.accessToken.substring(0, 20) }} ... {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
      </q-card-section>
      <q-card-section>
        <strong>Name</strong>
        {{ currentUser.name }}
        {{ currentUser.roles[0] }}
      </q-card-section>

      <q-card-section>
        <strong>Id</strong>
        {{ currentUser.id }}
      </q-card-section>

      <q-card-section>
        <strong>Email</strong>
        {{ currentUser.email }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'ProfilePage',
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  mounted () {
    if (!this.currentUser) {
      this.$router.push('/auth/login')
    }
  }
}
</script>
