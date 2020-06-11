import api from './api/api';

export const getToken = async (form) => {
  const res = await api.post(`users/token/`, form);
  return { data: res.data, status: res.status};
}

export const getPostList = async (page=1) => {
  const res = await api.get(`posts/?page=${page}`);
  return { data: res.data, status: res.status };
}

export const getPostDetail = async (slug) => {
  const res = await api.get(`posts/${slug}/`);
  return { data: res.data, status: res.status };
}

export const postBlog = async (form) => {
  const res = await api.post(`posts/`, form);
  return { data: res.data, status: res.status };
}