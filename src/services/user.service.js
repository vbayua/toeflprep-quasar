import { api } from 'src/boot/axios'
import authHeader from './auth-header'
// const API_URL = 'http://localhost:5000/api/test/'
class UserService {
  async getPublicContent () {
    return await api.get('/test/all')
  }

  async getUserBoard (username) {
    if (!username) {
      return await api.get('/test/user', { headers: authHeader() })
    } else {
      return await api.get(`/test/user?username=${username}`)
    }
  }

  async getModeratorBoard () {
    return await api.get('/test/mod', { headers: authHeader() })
  }

  async getAdminBoard () {
    return await api.get('/test/admin', { headers: authHeader() })
  }

  async getExamList () {
    return await api.get('/exam', { headers: authHeader() })
  }
}
export default new UserService()
