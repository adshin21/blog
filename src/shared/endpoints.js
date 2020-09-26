import api from './api/api';

export const getToken = async (form) => {
  try {
    const res = await api.post(`users/token/`, form);
    return { data: res.data, status: res.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};

export const getSocialToken = async (form) => {
  try {
    const res = await api.post(`auth/social/jwt-pair/`, form);
    return { data: res.data, status: res.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};

export const SignUp = async (form) => {
  try {
    const res = await api.post(`users/register/`, form);
    return { data: res.data, status: res.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};

export const getPostList = async (page = 1) => {
  const res = await api.get(`posts/?page=${page}`);
  return { data: res.data, status: res.status };
};

export const getPostDetail = async (slug) => {
  const res = await api.get(`posts/${slug}/`);
  return { data: res.data, status: res.status };
};

export const postBlog = async (form) => {
  try {
    const res = await api.post(`posts/create/`, form);
    return { data: res.data, status: res.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};

export const getRecommendation = async (form) => {
  const res = await api.post(`posts/f/recommendation/`, form);
  return { data: res.data, status: res.status };
};

export const getAllTags = async () => {
  const res = await api.get('posts/tags/');
  return { data: res.data, status: res.status };
};

export const forgotPassword = async ( form ) => {
  const res = await api.post('auth/users/reset_password/', form);
  return { data: res.data, status: res.status };
}

export const resetPassword = async ( form ) => {
  try{
    const res = await api.post('auth/users/reset_password_confirm/', form);
    return { data: res.data, status: res.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
}