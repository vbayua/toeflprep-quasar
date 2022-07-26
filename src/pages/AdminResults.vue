<template>
  <q-page
    padding
    class="column items-center"
  >
    <!-- content -->
    <div class="text-h6 text-center q-mt-lg">
      <span> TOEFL Preparation Result </span>
    </div>
    <div>
      <div
        v-for="(exam, index) in examlist"
        :key="index"
        class="q-mt-lg"
      >
        <q-card
          class="q-px-md q-mb-lg"
        >
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label>{{ exam.title }}</q-item-label>
              </q-item-section>
              <q-item-section
                side
                top
              >
                <q-btn
                  flat
                  color="primary"
                  label="View Result"
                  :to="{name: 'resultlist', params: { id: exam._id }}"
                />
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-page-scroller
      expand
      position="top"
      :scroll-offset="150"
      :offset="[0, 0]"
    >
      <div class="col cursor-pointer q-pa-sm bg-accent text-white text-center">
        Scroll back up...
      </div>
    </q-page-scroller>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import userService from 'src/services/user.service'
export default {
  name: 'AdminResults',
  setup () {
  },
  data () {
    return {
      examlist: ref(null)
    }
  },
  mounted () {
    userService.getExamList().then(
      response => {
        this.examlist = response.data.exam
      },
      error => [
        this.$q.notify({
          message: error
        })
      ]
    )
  }
}
</script>
