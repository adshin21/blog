import React, { useState } from 'react';
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
}));

const LogIn = () => {
  const classes = useStyles();

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [backdrop, setBackDrop] = useState(false);
  let [modal, setModal] = useState(false);

  const userState = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let form = {
      username: username,
      password: password,
    };

    setBackDrop(true);
    const res = await getToken(form);

    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: LOGGED_IN,
        user: jwt.decode(res.data.access, process.env.REACT_APP_VERIFYING_KEY),
      });
      login(res.data.access, res.data.refresh);
      setBackDrop(false);
      history.push('/');
    } 
    else {
      console.log(res);
      setBackDrop(false);
      setModal(true);
    }
  };

  if (userState.authData.auth) 
    history.push('/');

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
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username or Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default LogIn;
