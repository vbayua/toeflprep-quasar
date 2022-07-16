import { api } from 'src/boot/axios'
class AuthService {
  async login (user) {
    const response = await api.post('/auth/signin', user)
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (user) {
    return api.post('/auth/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
}
export default new AuthService()
