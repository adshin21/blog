import api from './api/api';


export const getPostList = async () => {
  const res = await api.get('posts/');
  return { data: res.data, status: res.status };
}

export const getPostDetail = async (slug) => {
  const res = await api.get(`posts/${slug}`);
  return { data: res.data, status: res.status };
}