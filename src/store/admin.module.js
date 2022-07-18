import AdminService from '../services/admin.service'

export const admin = {
  namespaced: true,
  state: {
    exams: null,
    message: null
  },
  actions: {
    getAllExam ({ commit }) {
      return AdminService.getAllExam().then(
        exam => {
          commit('allExam', exam)
          return Promise.resolve(exam)
        },
        error => {
          commit('fetchFailure')
          return Promise.reject(error)
        }
      )
    },
    createExam ({ commit }, examData) {
      return AdminService.createExam(examData).then(
        exam => {
          commit('createExam', exam)
          return Promise.resolve(exam)
        },
        error => {
          commit('postFailure')
          return Promise.reject(error)
        }
      )
    },
    deleteExam ({ commit }, data) {
      return AdminService.deleteExam(data).then(
        exam => {
          return Promise.resolve(exam)
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    allExam (state, exam) {
      state.exams = exam
    },
    fetchFailure (state, exam) {
      state.exams = null
    },
    createExam (state, exam) {
      state.message = 'Success create new exam '
      state.message += exam
    }
  }
}
