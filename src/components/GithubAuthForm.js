import React from 'react';

import {
  Button
} from '@material-ui/core';

import { GoMarkGithub } from "react-icons/go";

const GithubAuthForm = () => {
  return (
    <Button 
      variant="contained" 
      color="default"
      startIcon={<GoMarkGithub />}
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user:email&redirect_uri=http://localhost:3000/login`}
    >
      Sign in with Github
    </Button>
  )
};

export default GithubAuthForm;