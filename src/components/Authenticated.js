import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Authenticated = ({ component: Component, ...rest}) => {
  const userState = useSelector(state => state);
  return (
    <Route {...rest} render={ props=> (
      userState.authData.auth ? <Component {...props} {...rest} /> : <Redirect to='/login' />
    )} />
  )
}

export default Authenticated;