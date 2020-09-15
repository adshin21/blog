import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Authenticated = ({ comp: Component, ...rest}) => {
  const userState = useSelector(state => state);
  const loaded = userState.authData.loaded;
  const isAuthenticated = userState.authData.auth === true;

  if(loaded === false)
    return <></>;
  return (
    <Route {...rest} render={ props=> (
      isAuthenticated ? <Component {...props} {...rest} /> : <Redirect to={{ pathname: '/login' }} />
    )} />
  )
}

export default Authenticated;