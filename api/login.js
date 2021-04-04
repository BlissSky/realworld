import { instance } from '@/plugins/request'

export const registerUser = data => {
   return instance({
    method: 'post',
    url: '/api/users',
    data
  });
}
export const loginUser = data => {
   return instance({
    method: 'post',
    url: '/api/users/login',
    data
  });
}