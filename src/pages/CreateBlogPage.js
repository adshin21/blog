import React, { useState } from 'react';
import { Editor } from '../components/Editor';

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
  Backdrop,
  CircularProgress,
} from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { postBlog } from '../shared/endpoints';
import TransitionsModal from '../components/TransitionsModal';
import { history } from '../App';

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const names = [
  'array', 
  'math', 
  'linked list', 
  '2-sat',
  'binary search',
  'bitmasks',
  'brute force',
  'combinatorics',
  'constructive algorithm',
  'data structures',
  'dfs',
  'divide and conquer',
  'dp',
  'dsu',
  'fft',
  'games',
  'geometry',
  'graphs',
  'greedy',
  'hashing',
  'implementation',
  'number theory',
  'searching',
  'sortings',
  'strings',
  'trees',
  'two pointers',
];

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
  let [modal, setModal] = useState(false);
  let [backdrop, setBackDrop] = useState(false);

  const handleChange = (event) => {
    settags(event.target.value);
  };

  const handleEditorChange = (content, delta, source, editor) => {
    const htmlText = editor.getHTML();
    const deltaText = editor.getContents();
    setContent(htmlText);
    setDelta(deltaText);
  };

  const handleSubmit = async (e) => {
    setBackDrop(true);
    e.preventDefault();

    let new_tag = tags.map((e) => ({ name: e }));
    let form = {
      title: title,
      tags: new_tag,
      content: content,
      delta: JSON.stringify(delta),
    };

    const res = await postBlog(form);
    if (res.status === 201) {
      setBackDrop(false);
      history.push(`/blogpost/${res.data.slug}`);
    } 
    else {
      setBackDrop(false);
      setModal(true);
    }
  };

  const classes = useStyles();
  const theme = useTheme();

  if (modal) {
    return (
      <TransitionsModal
        modal={true}
        heading="Error in creation"
        description="Please try after sometime"
        setModal={setModal}
      />
    );
  }
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Backdrop className={classes.backdrop} open={backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
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
          {/* <Typography
            fontStyle="italic"
            variant="caption"
            display="block"
            color="error"
            gutterBottom={true}
          >
            caption textg
          </Typography>{' '} */}
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
