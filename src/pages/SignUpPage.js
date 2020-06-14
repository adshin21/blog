import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { history } from '../App';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Backdrop,
  CircularProgress,
  Box,
  Container,
  Typography
} from '@material-ui/core';

import { SignUp } from '../shared/endpoints';
import TransitionsModal from '../components/TransitionsModal';


import {
  LockOutlined as LockOutlinedIcon,
} from '@material-ui/icons';

import {
  makeStyles
} from '@material-ui/core/styles';

import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpPage = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [backdrop, setBackDrop] = useState(false);
  const [modal, setModal] = useState(false);

  const userState = useSelector(state => state);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let form = {
      username: username,
      email: email,
      password: password,
    }

    setBackDrop(true);
    const res = await SignUp(form);

    if(res.status === 201){
      setBackDrop(false);
      history.push('/login');
    }
    else {
      setBackDrop(false);
      setModal(true);
    }
  }
  
  if(userState.authData.auth)
    history.push('/');

    if (modal) {
      return (
        <TransitionsModal
          modal={true}
          heading="SignUp Falied"
          description="Please try after sometime and check the details"
          setModal={setModal}
        />
      );
    }

  return (
    <Container component="main" maxWidth="xs">
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
          </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Username"
                value={username}
                autoFocus
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
            </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Go to Home
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUpPage;