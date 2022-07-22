<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="drawer = !drawer"
        />

        <q-toolbar-title>
          TOEFL Preparation
        </q-toolbar-title>

        <q-space />

        <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
        <q-btn
          flat
          padding="2px 10px"
          icon-right="admin_panel_settings"
        >
          <div class="text-left q-mr-sm">
            {{ currentUser.name }}
          </div>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <q-icon name="account_circle" />
                </q-avatar>

                <div class="text-subtitle1">
                  {{ currentUser.name }}
                </div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="md"
                  @click="logout"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above

      :mini="miniState"
      mini-to-overlay
      :width="200"
      :breakpoint="500"

      bordered
      class="bg-grey-3"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-ripple
            clickable
            to="/admin"
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item
            v-ripple
            clickable
            to="/admin/exam-data"
          >
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>

            <q-item-section>
              Data Ujian
            </q-item-section>
          </q-item>

          <q-item
            v-ripple
            clickable
            to="/admin/results-data"
          >
            <q-item-section avatar>
              <q-icon name="assignment_turned_in" />
            </q-item-section>

            <q-item-section>
              Data Hasil
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item
            v-ripple
            clickable
            to="/admin/students-data"
          >
            <q-item-section avatar>
              <q-icon name="groups" />
            </q-item-section>

            <q-item-section>
              Data Mahasiswa
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AdminLayout',

  components: {
  },

  setup () {
    return {
      drawer: ref(false),
      miniState: ref(true)
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  mounted () {
    if (!this.currentUser && this.currentUser.roles[0] !== 'admin') {
      this.$router.push('/auth/login')
    }
  },
  methods: {
    async logout () {
      try {
        this.$q.loading.show({
          message: 'Signing out'
        })
        await this.$store.dispatch('auth/logout')
        await this.$router.push('/')
      } catch (error) {
        this.$q.loading.hide()
        this.$q.notify({
          message: error,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
    }
  }
})
</script>
