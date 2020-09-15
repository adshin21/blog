import React, { useState, useEffect } from 'react';
import { login } from '../redux/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';

import jwt from 'jsonwebtoken';

import { getToken } from '../shared/endpoints';
import { history } from '../App';
import {
  Avatar,
  Button,
  Backdrop,
  CircularProgress,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Container,
  Typography,
} from '@material-ui/core';

import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../components/Copyright';
import { LOGGED_IN } from '../redux/actions/types';

import TransitionsModal from '../components/TransitionsModal';

import GoogleAuthForm from '../components/GoogleAuthForm';
import GithubAuthForm from '../components/GithubAuthForm';

import { useLocation } from 'react-router-dom';
import { getSocialToken } from '../shared/endpoints';

import useForm from '../hooks/useForm';
import { useSnackbar } from 'notistack';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  social: {
    margin: theme.spacing(1.2),
  },
  signin: {
    alignItems: 'center',
  },
}));

const LogIn = () => {
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onClickDismiss = (key) => () => {
    closeSnackbar(key);
  };

  const loginSuccessSnackbar = () => {
    enqueueSnackbar("Successfully Logged In", {
      variant: "success",
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      autoHideDuration: 3000,
      action: key => <Button onClick={onClickDismiss(key)}>Got It</Button>
    });
  }

  const stateSchema = {
    username: { value: '', error: '' },
    password: { value: '', error: '' },
  };

  const stateValidatorSchema = {
    username: {
      required: true,
      validator: {
        func: (value) =>
          /^[a-zA-Z]+$/.test(value) ||
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value,
          ),
        error: 'Invalid username format.',
      },
    },
    password: {
      required: true,
      validator: {
        func: (value) => /^(?!\s*$).+/.test(value),
        error: 'Invalid password.',
      },
    },
  };

  const handleSubmit = async (form) => {
    setBackDrop(true);
    const res = await getToken(form);

    if (res.status === 200) {
      dispatch({
        type: LOGGED_IN,
        user: jwt.decode(res.data.access, process.env.REACT_APP_VERIFYING_KEY),
      });
      login(res.data.access, res.data.refresh);
      setBackDrop(false);
      loginSuccessSnackbar();
      history.push('/');
    } 
    else {
      setBackDrop(false);
      
      for (let res_key in res.data) {
        if(typeof(res.data[res_key]) === "object"){
          for (let msg of res.data[res_key]) {
            enqueueSnackbar(msg, {
              variant: "error",
              autoHideDuration: 9000,
              action: key => <Button onClick={onClickDismiss(key)}>Got It</Button>
            });
          }
        }
        else{
            enqueueSnackbar(res.data[res_key], {
              variant: "error",
              autoHideDuration: 9000,
              action: key => <Button onClick={onClickDismiss(key)}>Got It</Button>
            });
        }
        
      }
    }
  };

  const { values, errors, dirty, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidatorSchema,
    handleSubmit,
  );

  const { username, password } = values;

  let [backdrop, setBackDrop] = useState(false);
  let [modal, setModal] = useState(false);

  const location = useLocation();
  const userState = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCode = async () => {
      let url_data = location.search.split('?code=');
      if (url_data.length >= 2 && url_data[1]) {
        setBackDrop(true);
        const res = await getSocialToken({ code: url_data[1], provider: 'github' });
        if (res.status === 200) {
          dispatch({
            type: LOGGED_IN,
            user: jwt.decode(res.data.access, process.env.REACT_APP_VERIFYING_KEY),
          });
          login(res.data.access, res.data.refresh);
          setBackDrop(false);
          loginSuccessSnackbar();
          history.push('/');
        } else {
          setBackDrop(false);
          setModal(true);
        }
      }
    };
    getCode();
  }, []); // eslint-disable-line

  const responseGoogle = async (response) => {
    setBackDrop(true);
    const res = await getSocialToken({ code: response.tokenObj.access_token, provider: 'google' });
    if (res.status === 200) {
      dispatch({
        type: LOGGED_IN,
        user: jwt.decode(res.data.access, process.env.REACT_APP_VERIFYING_KEY),
      });
      login(res.data.access, res.data.refresh);
      setBackDrop(false);
      history.push('/');
      loginSuccessSnackbar();
    } else {
      setBackDrop(false);
      setModal(true);
    }
  };

  const onFailure = (res) => {
    setModal(true);
  };

  if (userState.authData.auth) history.push('/');

  if (modal) {
    return (
      <TransitionsModal
        modal={true}
        heading="Login Falied"
        description="Please try after sometime"
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username or Email Address"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleOnChange}
            error={errors.username && dirty.username}
            helperText={errors.username && dirty.username ? errors.username : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleOnChange}
            error={errors.password && dirty.password}
            helperText={errors.password && dirty.password ? errors.password : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={disable}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Go to Home
              </Link>
            </Grid>

            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.social}
        >
          <Grid item>
            <Typography component="h5" variant="h5">
              Or
            </Typography>
          </Grid>
          <Grid item className={classes.social}>
            <GoogleAuthForm responseGoogle={responseGoogle} onFailure={onFailure} />
          </Grid>

          <Grid item className={classes.social}>
            <GithubAuthForm />
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default LogIn;