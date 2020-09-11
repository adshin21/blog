import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Authenticated = ({ comp: Component, ...rest}) => {
  const userState = useSelector(state => state);
  const loading = userState.authData.loading;
  const isAuthenticated = userState.authData.auth === true;

  if(loading === false)
    return <></>;
  return (
    <Route {...rest} render={ props=> (
      isAuthenticated ? <Component {...props} {...rest} /> : <Redirect to={{ pathname: '/login' }} />
    )} />
  )
}

export default Authenticated;