import React, { useState, useRef } from 'react';
import Editor from '../components/Editor/_Editor';
import { 
  Container, 
  Paper, 
  Button, 
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { EDITOR_JS_TOOLS } from '../components/Editor/constants';

import { postBlog } from '../shared/endpoints';
import TransitionsModal from '../components/TransitionsModal';
import { history } from '../App';


const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.0rem',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CreateBlogPage = () => {
  let editor = useRef(null);
  let [backdrop, setBackDrop] = useState(false);
  let [modal, setModal] = useState(false);


  const fetchTitleContent = (data) => {
    let title = data.blocks[0].data.text;
    let content = data;
    content.blocks.shift();
    return { title, content };
  }

  // const onReady = () => {
  //   // https://editorjs.io/configuration#editor-modifications-callback
  //   console.log('Editor.js is ready to work!');
  // };

  // const onChange = () => {
  //   // https://editorjs.io/configuration#editor-modifications-callback
  //   // console.log("Now I know that Editor's content changed!");
  // };

  const onSave = async (e) => {
    // https://editorjs.io/saving-data
    try {
      const outputData = await editor.save();
      e.persist();

      console.log(outputData);

      // const { title, content } = fetchTitleContent(outputData);

      // let form = {
      //   title: title,
      //   content: content,
      //   tags: [{ "name": "random" }]
      // };


      // const res = await postBlog(form);
      // if (res.status === 201) {
      //   setBackDrop(false);
      //   history.push(`/blogpost/${res.data.slug}`);
      // } else {
      //   setBackDrop(false);
      //   setModal(true);
      // }
    } catch (e) {
      console.log('Saving failed: ', e);
    }
  };

  const classes = useStyles();

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
    <Container maxWidth="md">
      <Paper elevation={1} className={classes.paper}>
        <Backdrop className={classes.backdrop} open={backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Editor
          holder="editor-container"
          placeholder={'Tell your Story...'}
          tools={EDITOR_JS_TOOLS}
          reinitializeOnPropsChange={true}
          editorInstance={(editorInstance) => {
            editor = editorInstance;
          }}
          minHeight="100"
        />
      </Paper>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button onClick={(e) => onSave(e)} variant="contained" color="primary">
          Save
        </Button>{' '}
      </Grid>
    </Container>
  );
};

export default CreateBlogPage;
