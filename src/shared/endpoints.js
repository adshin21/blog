import api from './api/api';

export const getToken = async (form) => {
  try {
    const res = await api.post(`users/token/`, form);
    return { data: res.data, status: res.status};
  }
  catch (error){
    return { data: error.response.data, status: error.response.status };
  }
};

export const SignUp = async (form) => {
  try{
    const res = await api.post(`users/register/`, form);
    return { data: res.data, status: res.status };
  }
  catch (error) {
    return { data: error.response.data, status: error.response.status};
  }
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

  try {
    const res = await api.post(`posts/create/`, form);
    return { data: res.data, status: res.status };
  }
  catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
}

export const getRecommendation = async (form) => {
  const res = await api.post(`posts/f/recommendation/`, form);
  return { data: res.data, status: res.status };
}