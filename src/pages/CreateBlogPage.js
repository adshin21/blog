import React, { useState } from 'react';
import { Editor } from '../components/Editor';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Container,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateBlogPage = () => {
  let [content, setContent] = useState('');
  let [delta, setDelta] = useState({});

  const handleEditorChange = (content, delta, source, editor) => {
    const htmlText = editor.getHTML();
    const deltaText = editor.getContents();
    setContent(htmlText);
    setDelta(deltaText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Content
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            style={{ marginBottom: "10"}}
          />
          <Editor
            content={content}
            handleChange={handleEditorChange}
            placeholder="Put your content here.... (without main title)"
          />
          <Container justify="center" maxWidth="xs">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </Container>
        </form>
      </div>
    </Container>
  );
};

export default CreateBlogPage;
