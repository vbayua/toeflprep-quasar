import { api } from 'src/boot/axios'
import authHeader from './auth-header'
// const API_URL = 'http://localhost:5000/api/test/'
class ExamService {
  async getListeningQuestions (examId) {
    return await api.get(`/exam/${examId}/listening-questions`, { headers: authHeader() })
  }

  async getStructureQuestions (examId) {
    return await api.get(`/exam/${examId}/structure-questions`, { headers: authHeader() })
  }

  async getReadingQuestions (examId) {
    return await api.get(`/exam/${examId}/reading-questions`, { headers: authHeader() })
  }

  async saveNestedResponses (data) {
    return await api.post('/save/results', data, { headers: authHeader() })
  }

  // async addListeningResponse (examId, userId) {
  //   return await api.post('')
  // }
}
export default new ExamService()
