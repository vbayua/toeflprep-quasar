import userService from 'src/services/user.service'
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
    updateExam ({ commit }, examData) {
      return AdminService.updateExam(examData._id, examData).then(
        exam => {
          return Promise.resolve(exam)
        },
        error => {
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
    },
    getExamWithDataSoal ({ commit }, data) {
      return AdminService.getQuestionsInExam(data).then(
        exam => {
          return Promise.resolve(exam)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    setExamStatus ({ commit }, data) {
      return AdminService.updateExamStatus(data._id, data.status).then(
        exam => {
          return Promise.resolve(exam)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    getExamResults ({ commit }, data) {
      return AdminService.getExamResults(data.examId).then(
        result => {
          return Promise.resolve(result)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    addQuestion ({ commit }, data) {
      return AdminService.addQuestions(data.testExam, data).then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    async updateQuestion ({ commit }, data) {
      return AdminService.updateQuestion().then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    async getAllUsers ({ commit }) {
      try {
        const users = userService.getAllUsers()
        return await Promise.resolve(users)
      } catch (error) {
        return await Promise.reject(error)
      }
    },

    async uploadFile (file) {
      try {
        const response = await AdminService.uploadFile(file)
        return await Promise.resolve(response)
      } catch (error) {
        return await Promise.reject(error)
      }
    },
    async getBlobInfo (file) {
      return AdminService.getFileInfo(file).then(
        response => {
          return Promise.resolve(response)
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
    },
    examWithDataSoal (state, exam) {
      state.message = 'Exam With Data Soal'
    }
  }
}
