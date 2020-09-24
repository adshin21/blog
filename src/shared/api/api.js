import axios from 'axios';
import { LOGGED_OUT } from '../../redux/actions/types';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import store from '../../redux/store';
import { logout } from '../../redux/actions/authActions';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
});

api.interceptors.request.use(
  async (config) => {
    const access_token = Cookies.get('__access_token');
    const refresh_token = Cookies.get('__refresh_token');

    if (refresh_token) {
      try {
        jwt.verify(access_token, process.env.REACT_APP_VERIFYING_KEY);
        config.headers['Authorization'] = `Bearer ${access_token}`;
      } catch (e) {
        try {
          jwt.verify(refresh_token, process.env.REACT_APP_VERIFYING_KEY);
          Cookies.remove('__access_token');
          const res = await axios.post(process.env.REACT_APP_API_URL + 'users/token/refresh/', {
            refresh: refresh_token,
          });
          Cookies.set('__access_token', res.data.access);

          if (res.status === 200) {
            if (res.data.access) {
              config.headers['Authorization'] = `Bearer ${res.data.access}`;
            }
          } else {
            logout();
            store.dispatch({
              type: LOGGED_OUT,
            });
          }
        } catch (e) {
          logout();
          store.dispatch({
            type: LOGGED_OUT,
          });
        }
      }
    } else {
      logout();
      store.dispatch({
        type: LOGGED_OUT,
      });
    }
    return config;
  },
  (error) => console.log(error),
);

export default api;
