import {
  LOGGED_IN,
  LOGGED_OUT
} from './types';

import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { history } from '../../App';

export const login = (access, refresh) => {
  Cookies.set("__access_token", access);
  Cookies.set("__refresh_token", refresh);
}

export const logout = () => {
  Cookies.remove("__access_token");
  Cookies.remove("__refresh_token");
  history.push("/login");
}