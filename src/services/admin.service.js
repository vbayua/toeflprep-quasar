import { api } from 'src/boot/axios'
import authHeader from './auth-header'
// const API_URL = 'http://localhost:5000/api/test/'
class AdminService {
  async getAllExam () {
    return await api.get('/admin/exam', { headers: authHeader() })
  }

  async getExamById (examId) {
    return await api.get(`/admin/exam/get?id=${examId}`, { headers: authHeader() })
  }

  async createExam (examData) {
    return await api.post('/admin/exam/create', examData, { headers: authHeader() })
  }

  async updateExam (examId, examData) {
    return await api.put(`/admin/exam/update?id=${examId}`, examData, { headers: authHeader() })
  }

  async deleteExam (examData) {
    return await api.delete(`/admin/exam?id=${examData}`, { headers: authHeader() })
  }

  async getQuestionsInExam (examData) {
    return await api.get(`/admin/exam/${examData}`, { headers: authHeader() })
  }

  async getExamInQuestions (examId) {
    return await api.get(`/admin/exam/questions?id=${examId}`, { headers: authHeader() })
  }

  async addQuestions (examId, questionData) {
    return await api.post(`/admin/exam/${examId}/question/add`, questionData, { headers: authHeader() })
  }
}
export default new AdminService()
