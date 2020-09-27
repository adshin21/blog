import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, Typography, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { getPostDetail } from '../shared/endpoints';
import moment from 'moment';
import ReadOnly from '../components/Editor/ReadOnly';
import EditorJs from '../components/Editor/_Editor';
import { EDITOR_JS_TOOLS } from '../components/Editor/constants';
import TagChip from '../components/TagChip';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(8),
    margin: theme.spacing(4),
    fontSize: '1.1rem',
  },
  details: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: 'inherit',
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
    // marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  typorgrahpy: {
    margin: 'auto',
    marginRight: 'inherit',
  }
}));

const BlogPostPage = ({ params, setParentPost }) => {
  const [post, setPost] = useState({});

  const classes = useStyles();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await getPostDetail(params.slug);
      setPost(res.data);
      setParentPost(res.data);
    };
    fetchdata();
  }, [params.slug, setParentPost]);

  const { tags, published_at } = post;

  return (
    <>
      <CssBaseline />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" align="center" gutterBottom>
            {post.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" align="center">
            {`created at: ${moment(published_at).fromNow()}`}
          </Typography>
        </Grid>
        <Grid item style={{ overflow: 'hidden' }}>
          <Typography variant="subtitle1" align="center">
            {`written by: ${post.author}`}
          </Typography>
        </Grid>
      </Grid>

      <div style={{ display: 'none' }}>
        <EditorJs minHeight="0" tools={EDITOR_JS_TOOLS} />
      </div>
      <Paper elevation={1} className={classes.paper}>
        <div
          id="editor-container"
          style={{
            maxWidth: '650px',
            position: 'relative',
            margin: '0 auto',
            transition: 'background-color .15s ease',
          }}
        >
          <div className="codex-editor">
            <div className="codex-editor__redactor">
              {post.content ? <ReadOnly data={post.content} /> : null}
            </div>
          </div>
        </div>
      </Paper>

      <Grid container direction="column" justify="center" alignItems="flex-start">
        <Grid item>
          <div className={classes.tag}>
            <Typography variant="h5" component="h3" color="textPrimary" className={classes.typorgrahpy}>
              Tags: {' '}
            </Typography>

            <TagChip
              tags={tags}
            />
          </div>
        </Grid>
      </Grid>

      {/* </Container> */}
    </>
  );
};

export default BlogPostPage;
