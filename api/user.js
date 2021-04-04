import { instance } from '@/plugins/request'

export const getUser = () => {
   return instance({
    method: 'GET',
    url: '/api/user',
  });
}
export const updateUser = () => {
   return instance({
    method: 'PUT',
    url: '/api/user',
  });
}

export const followUser = (username) => {
  return instance({
   method: 'POST',
   url: `/api/profiles/${username}/follow`,
 });
}

export const unFollowUser = (username) => {
  return instance({
   method: 'DELETE',
   url: `/api/profiles/${username}/follow`,
 });
}