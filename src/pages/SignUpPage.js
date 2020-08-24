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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpPage = () => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const onClickDismiss = key => () => { 
    closeSnackbar(key);
  };

  const stateSchema = {
    username: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPassword: { value: "", error: "" }
  };

  const stateValidatorSchema = {
    username: {
      required: true,
      validator: {
        func: value => /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/.test(value),
        error: "Invalid username format.\n\nAllowed characters { A-Z, a-z, 0-9, '.', '_' }"
      }
    },
    email: {
      required: true,
      validator: {
        func: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
        error: "Invalid email format."
      }
    },
    password: {
      required: true,
      validator: {
        func: value => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value),
        error: "Invalid password. It should consists characters, numbers and special character and minimum length should be 6"
      }
    },
    confirmPassword: {
      required: true,
      validator: {
        func: value => values['password'] === value,
        error: "Password not match."
      }
    },
  };

  const [backdrop, setBackDrop] = useState(false);
  const [modal, setModal] = useState(false);
  let [usernameError, setUsernameError] = useState(false);
  let [emailError, setEmailError] = useState(false);

  const userState = useSelector(state => state);

  const handleSubmit = async (form) => {

    setBackDrop(true);
    const res = await SignUp(form);

    if(res.status === 201){
      setBackDrop(false);
      history.push('/login');
      enqueueSnackbar("Successfully signed up", { 
        variant: "success", 
        autoHideDuration: 3000,
        anchorOrigin: {
          horizontal: 'centre',
          vertical: 'bottom',
        },
        action: key => <Button onClick={onClickDismiss(key)}>Got It</Button>
      });
    }
    else {
      for(let res_key in res.data){

        if(res_key === "username"){
          setUsernameError(true);
        }

        if(res_key === "email"){
          setEmailError(true);
        }
        for(let msg of res.data[res_key]){
          enqueueSnackbar(msg, { 
            variant: "error", 
            autoHideDuration: 9000,
            action: key => <Button onClick={onClickDismiss(key)}>Got It</Button>
          });
        }
      }
      setBackDrop(false);
    }
  }

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    disable
  } = useForm(stateSchema, stateValidatorSchema, handleSubmit);
  
  const { username, email, password, confirmPassword } = values;

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
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                autoFocus
                onChange={handleOnChange}
                // FormHelperTextProps={{
                //   className: classes.helperText
                // }}
                error={(errors.username && dirty.username) || usernameError}
                helperText={(errors.username && dirty.username) ? errors.username : ""}
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
                onChange={handleOnChange}
                error={(errors.email && dirty.email) || emailError}
                helperText={(errors.email && dirty.email) ? errors.email : ""}
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
                onChange={handleOnChange}
                error={(errors.password && dirty.password)}
                helperText={(errors.password && dirty.password) ? errors.password : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                value={confirmPassword}
                onChange={handleOnChange}
                error={(errors.confirmPassword && dirty.confirmPassword)}
                helperText={(errors.confirmPassword && dirty.confirmPassword) ? errors.confirmPassword : ""}
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={disable}
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