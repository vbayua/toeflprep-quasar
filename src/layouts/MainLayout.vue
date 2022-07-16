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
          icon-right="account_circle"
          label="Account"
        >
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
          >
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>

            <q-item-section>
              TOEFL Test
            </q-item-section>
          </q-item>

          <q-item
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon name="assignment_turned_in" />
            </q-item-section>

            <q-item-section>
              Hasil Test
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
  name: 'MainLayout',

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
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      await this.$router.push('/')
    }
  }
})
</script>
