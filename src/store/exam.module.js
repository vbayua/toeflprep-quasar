import adminService from 'src/services/admin.service'
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
    },
    getUserResults (data) {
      return examService.getUserResults(data.userId).then(
        result => {
          return Promise.resolve(result)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    getUserExamResult (data) {
      return examService.getUserExamResult(data).then(
        result => {
          return Promise.resolve(result)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    getExamResults (data) {
      return adminService.getExamResults(data.examId).then(
        result => {
          return Promise.resolve(result)
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
