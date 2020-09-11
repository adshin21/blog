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
import CreateMultiSelect from '../components/SelectTag'; // eslint-disable-line

import { useSnackbar } from 'notistack';

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

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const onClickDismiss = (key) => () => {
    closeSnackbar(key);
  };

  const fetchTitleContent = (data) => {
    let slice_index = -1;
    for(let block_id in data.blocks){
      const type = data.blocks[block_id].type;

      if(type === 'paragraph' || type === 'header'){
        slice_index = block_id;
        break;
      }
    }

    if(slice_index === -1){
      return { status: "false", title: "" , content: "" };
    }
    
    let heading = data.blocks.splice(slice_index, 1);
    let title = heading[0].data.text;
    let content = data;
    return { status: "true", title , content };
  }

  const onReady = async () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    await editor.isReady;
    console.log('Editor.js is ready to work!');
  };

  // const onChange = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    // console.log("Now I know that Editor's content changed!");
  // };


  const onSave = async (e) => {
    // https://editorjs.io/saving-data
    try {
      const outputData = await editor.save();
      e.persist();


      const { status, title, content } = fetchTitleContent(outputData);
      

      if(status === "false"){
        enqueueSnackbar("You should provide a heading or a paragraph for title", {
          variant: "error",
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          },
          autoHideDuration: 8000,
          action: key => <Button onClick={onClickDismiss(key)}>Got It</Button>
        });
        return;
      }


      let form = {
        title: title,
        content: content,
        tags: [{ "name": "random" }]
      };


      const res = await postBlog(form);
      if (res.status === 201) {
        setBackDrop(false);
        enqueueSnackbar("Hurray!! Post Created", {
          variant: "success",
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          autoHideDuration: 3000,
          action: key => <Button onClick={onClickDismiss(key)}>Got It</Button>
        });
        history.push(`/blogpost/${res.data.slug}`);
      } else {
        setBackDrop(false);
        setModal(true);
      }
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
          // reinitializeOnPropsChange={true}
          editorInstance={(editorInstance) => {
            editor = editorInstance;
          }}
          minHeight="100"
          logLevel= 'ERROR'
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
