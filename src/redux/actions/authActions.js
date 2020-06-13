import Cookies from 'js-cookie';

export const login = (access, refresh) => {
  Cookies.set("__access_token", access);
  Cookies.set("__refresh_token", refresh);
}

export const logout = () => {
  Cookies.remove("__access_token");
  Cookies.remove("__refresh_token");
}