import React, { useState } from 'react';
import { 
  Avatar, 
  Button, 
  Container, 
  TextField, 
  makeStyles, 
  Typography,
  Backdrop,
  CircularProgress
} from '@material-ui/core';

import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import useForm from '../hooks/useForm';
import { forgotPassword } from '../shared/endpoints';
import CustomizedDialogs from '../components/CustomizedDialogs';
import { reset_password_title, reset_password_body } from '../shared/constants';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  typography: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    height: '50px',
    fontWeight: 800,
    marginTop: theme.spacing(2.5),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ForgotPasswordPage = () => {
  const classes = useStyles();
  const [backdrop, setBackdrop] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const stateSchema = {
    email : {
      value: "",
      error: "",
    }
  };

  const stateValidatorSchema = {
    email : {
      required: true,
      validator: {
        func: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
        error: "Invalid email."
      }
    }
  }

  const handleSubmit = async (form) => {
    setBackdrop(true);
    const res = await forgotPassword(form);
    if(res.status === 204){
      setOpenDialog(true);
    }
    setBackdrop(false);
  }

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    disable
  } = useForm(stateSchema, stateValidatorSchema, handleSubmit);

  const { email } = values;
  return (
    <Container component="main" maxWidth="xs">
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CustomizedDialogs open={openDialog} setOpen={setOpenDialog} dialog_title={reset_password_title} dialog_body={reset_password_body}/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password ?
        </Typography>{' '}
        <Typography component="h5" variant="h6">
          Don't panic! We're handling it
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <TextField
            id="email"
            name="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Enter your account's email"
            value={email}
            onChange={handleOnChange}
            error={Boolean(errors.email && dirty.email)}
            helperText={(errors.email && dirty.email) ? errors.email : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disable}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;
