import user from '../apis/students';

export const auth = async () => {
    const authRes = await user.get(`api/user/auth`, {
      headers: {
        'auth-token': sessionStorage.getItem('auth-token')
      }
    }).then(res => {
      return res.data
    }).catch(() => {
      return false
    })
    return authRes
  }