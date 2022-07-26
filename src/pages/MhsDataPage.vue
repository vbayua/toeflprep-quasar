<template>
  <q-page padding>
    <!-- content -->
    Users
    <div
      class=""
    >
      <div class="">
        <q-table
          title="Data User"
          :rows="users"
          :columns="columns"
          row-key="username"
        >
          <template #top-right>
            <q-input
              v-model="filter"
              borderless
              dense
              debounce="300"
              placeholder="Search"
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
const columns = [
  {
    name: 'username',
    align: 'left',
    label: 'Username',
    field: 'username',
    sortable: true
  },
  {
    name: 'name',
    align: 'left',
    label: 'Name',
    field: 'name',
    sortable: true
  },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: 'email'
  }
]
import { ref } from 'vue'
export default {
  name: 'DataMahasiswa',
  setup () {
    return {
      columns,
      filter: ref('')
    }
  },
  data () {
    return {
      users: ref([])
    }
  },
  mounted () {
    this.$store.dispatch('admin/getAllUsers').then(
      response => {
        this.users = response.data.user
      },
      error => {
        console.log(error)
      }
    )
  }
}
</script>
