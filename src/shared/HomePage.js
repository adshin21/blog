import api from './api/api';


export const getPostList = async (page=1) => {
  const res = await api.get(`posts/?page=${page}`);
  return { data: res.data, status: res.status };
}

export const getPostDetail = async (slug) => {
  const res = await api.get(`posts/${slug}/`);
  return { data: res.data, status: res.status };
}