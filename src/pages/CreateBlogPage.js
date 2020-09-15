import React, { useState, useRef } from 'react';
import Editor from '../components/Editor/_Editor';
import { 
  Container, 
  Paper, 
  Button, 
  Grid,
  Backdrop,
  CircularProgress,
  CssBaseline
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { EDITOR_JS_TOOLS } from '../components/Editor/constants';

import { postBlog } from '../shared/endpoints';
import TransitionsModal from '../components/TransitionsModal';
import { history } from '../App';
import CreateMultiSelect from '../components/SelectTag';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.1rem',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CreateBlogPage = () => {

  let editor = useRef(null);
  const [tags, setTags] = useState([]);
  const [editorData, setEditorData] = useState();
  const [backdrop, setBackDrop] = useState(false);
  const [modal, setModal] = useState(false);

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

  const checkTags = (data) => {
    if(data.length === 0)
      return { c_status: "false", categories: '' };
    return { c_status: "true", categories: data.map(e => ({ "name": e.name })) };
  }

  const onChange = async () => {
    const data = await editor.save();
    setEditorData(data);
  };

  const onSave = async (e) => {
    try {
      // const outputData = await editor.save();
      const outputData = editorData;
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

      const { c_status, categories } = checkTags(tags);

      if(c_status === "false"){
        enqueueSnackbar("You should provide at least one tags", {
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
        tags: categories,
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
      } 
      else {
        setBackDrop(false);
        setModal(true);
      }
    } 
    catch (e) {
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
          editorInstance={(editorInstance) => {
            editor = editorInstance;
          }}
          minHeight="100"
          logLevel="ERROR"
          onChange={onChange}
        />
      </Paper>
      <CssBaseline />
      <CreateMultiSelect tags={tags} setTags={setTags} />
      <Grid container direction="column" justify="center" alignItems="center">
        <Button onClick={(e) => onSave(e)} variant="contained" color="primary">
          Save
        </Button>{' '}
      </Grid>
    </Container>
  );
};

export default CreateBlogPage;
