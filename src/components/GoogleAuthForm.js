import React from 'react';
import GoogleLogin from 'react-google-login';

import {
  Button
} from '@material-ui/core';

import { FcGoogle } from "react-icons/fc";

const GoogleAuthForm = ({responseGoogle, onFailure}) => {

  return (
    <GoogleLogin 
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={
        renderProps => (
          <Button 
              variant="contained" 
              color="default" 
              disabled={renderProps.disabled}
              startIcon={<FcGoogle />}
              onClick={() => renderProps.onClick()}
            >
              Sign in with Google
          </Button>
        )
      }
      onSuccess={responseGoogle}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      responseType="code"
    />
  )
};

export default GoogleAuthForm;