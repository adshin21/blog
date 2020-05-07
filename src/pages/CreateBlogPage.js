import React, { useState } from 'react';
import { Editor } from '../components/Editor';
import axios from 'axios';

import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Container,
  Typography,
  MenuItem,
  InputLabel,
  Input,
  Select,
  Chip,
} from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import BlogPostPage from './BlogPostPage';

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
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
    // maxWidth: 300,
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const names = ['Array', 'String', 'Math', 'Dynamic Programming', 'Linked List', 'Tree'];

function getStyles(name, tags, theme) {
  return {
    fontWeight:
      tags.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateBlogPage = () => {
  let [content, setContent] = useState('');
  let [delta, setDelta] = useState({});
  let [tags, settags] = useState([]);
  let [title, setTitle] = useState('');
  let [data, setData] = useState('');

  const handleChange = (event) => {
    settags(event.target.value);
  };

  console.log(content, tags, title);

  const handleEditorChange = (content, delta, source, editor) => {
    const htmlText = editor.getHTML();
    const deltaText = editor.getContents();
    setContent(htmlText);
    setDelta(deltaText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let form = {
      title: title,
      tags: tags,
      content: content,
      delta: delta,
    };

    const res = await axios.post("http://localhost:8000/api/request/", form);
    setData(res.data);
  };

  const classes = useStyles();
  const theme = useTheme();

  if(data.length){
    return <BlogPostPage content={data} />
  }
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Content
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error={false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography fontStyle="italic" variant="caption" display="block" color='error' gutterBottom={true}>
            caption text
          </Typography>{' '}
          <Editor
            content={content}
            handleChange={handleEditorChange}
            placeholder="Put your content here.... (without main title)"
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={tags}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, tags, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
