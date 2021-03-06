import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { LOGGED_IN, LOGGED_OUT } from './redux/actions/types';
import { logout } from './redux/actions/authActions';


const Startup = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticate = () => {
      const access_token = Cookies.get('__access_token');
      const refresh_token = Cookies.get('__refresh_token');

      if (refresh_token) {
        try {
          const data = jwt.verify(access_token, process.env.REACT_APP_VERIFYING_KEY);
          dispatch({
            type: LOGGED_IN,
            user: data,
          });
        } catch (error) {
          try {
            const data = jwt.verify(refresh_token, process.env.REACT_APP_VERIFYING_KEY); // eslint-disable-line
            Cookies.remove('__access_token');

            axios
              .post(process.env.REACT_APP_API_URL + 'users/token/refresh/', {
                refresh: refresh_token,
              })
              .then((res) => {
                Cookies.set('__access_token', res.data.access);
                dispatch({
                  type: LOGGED_IN,
                  user: jwt.decode(res.data.access, process.env.REACT_APP_VERIFYING_KEY),
                });
              })
              .catch((err) => {
                logout();
                dispatch({
                  type: LOGGED_OUT,
                });
              });
          }
          catch (err) {
            logout();
            dispatch({
              type: LOGGED_OUT
            });
          }
        }
      } 
      else {
        logout();
        dispatch({
          type: LOGGED_OUT,
        });
      }
    };
    authenticate();
  }, []); // eslint-disable-line

  return <>{props.children}</>;
};

export default Startup;
