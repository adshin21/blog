import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Backdrop,
  CircularProgress,
  Avatar,
  Typography,
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import useForm from '../hooks/useForm';
import CustomizedDialogs from '../components/CustomizedDialogs';
import { reset_password_confirm_title, reset_password_confirm_body } from '../shared/constants';
import { resetPassword } from '../shared/endpoints';
import { history } from '../App';
import { useSnackbar } from 'notistack';

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

const ResetPasswordPage = () => {
  const classes = useStyles();
  const params = useParams();
  const [backdrop, setBackdrop] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const onClickDismiss = (key) => () => {
    closeSnackbar(key);
  };
  
  const stateSchema = {
    new_password: {
      value: '',
      error: '',
    },
    re_new_password: {
      value: '',
      error: '',
    },
  };

  const stateValidatorSchema = {
    new_password: {
      required: true,
      validator: {
        func: (value) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(value),
        error:
          'Invalid password. It should consists characters, numbers and special character and minimum length should be 8',
      },
    },
    re_new_password: {
      required: true,
      validator: {
        func: (value) => values['new_password'] === value,
        error: 'Password not match.',
      },
    },
  };

  const handleSubmit = async (form) => {
    setBackdrop(true);
    const form_with_tokens = { ...form, uid: params.uid, token: params.token };
    const res = await resetPassword(form_with_tokens);
    if(res.status === 204){
      setOpenDialog(true);
    }
    else{
      enqueueSnackbar('May be the link has expired, Please try to reset password again', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 8000,
        action: (key) => <Button onClick={onClickDismiss(key)}>Got It</Button>,
      });
    }
    setBackdrop(false);
  };

  const { values, errors, dirty, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidatorSchema,
    handleSubmit,
  );

  const { new_password, re_new_password } = values;
  return (
    <Container component="main" maxWidth="xs">
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CustomizedDialogs
        open={openDialog}
        setOpen={setOpenDialog}
        dialog_title={reset_password_confirm_title}
        dialog_body={reset_password_confirm_body}
        component={<Button color="primary" onClick={() => history.push('/login')}>Go to LogIn</Button>}
      />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter New Password
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <TextField
            id="new_password"
            name="new_password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Enter New Password"
            value={new_password}
            onChange={handleOnChange}
            error={Boolean(errors.new_password && dirty.new_password)}
            helperText={errors.new_password && dirty.new_password ? errors.new_password : ''}
          />
          <TextField
            id="re_new_password"
            name="re_new_password"
            variant="outlined"
            type="password"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            value={re_new_password}
            onChange={handleOnChange}
            error={Boolean(errors.re_new_password && dirty.re_new_password)}
            helperText={
              errors.re_new_password && dirty.re_new_password ? errors.re_new_password : ''
            }
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

export default ResetPasswordPage;
