import examService from 'src/services/exam.service'
export const exam = {
  namespaced: true,
  state: {
    exam: null,
    finished: false
  },
  actions: {
    getListeningQuestions ({ commit }, examId) {
      return examService.getListeningQuestions(examId).then(
        exam => {
          return Promise.resolve(exam)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    getReadingQuestions ({ commit }, examId) {
      return examService.getReadingQuestions(examId).then(
        exam => {
          return Promise.resolve(exam)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    getStructureQuestions ({ commit }, examId) {
      return examService.getStructureQuestions(examId).then(
        exam => {
          return Promise.resolve(exam)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    saveResult ({ commit }, data) {
      return examService.saveNestedResponses(data).then(
        succeed => {
          return Promise.resolve(succeed)
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    loginSuccess (state, user) {
      state.status.loggedIn = true
      state.user = user
    }
  }
}
