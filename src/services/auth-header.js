export default function authHeader () {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.accessToken) {
    return {
      'Access-Control-Allow-Origin': '*',
      'x-access-token': user.accessToken
    }
  } else {
    return {}
  }
}
