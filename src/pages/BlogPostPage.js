import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, Typography, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { getPostDetail } from '../shared/endpoints';
import moment from 'moment';
import ReadOnly from '../components/Editor/ReadOnly';
import EditorJs from '../components/Editor/_Editor';
import { EDITOR_JS_TOOLS } from '../components/Editor/constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(8),
    margin: theme.spacing(4),
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
  },
  chip: {
    marginLeft: '8px',
  },
  content: {
    fontSize: '18px',
  },
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
      <Grid container>
        <Typography variant="h3" component="h3">
          {post.title}
        </Typography>
      </Grid>
      <div style={{ display: 'none' }}>
        <EditorJs minHeight="0" tools={EDITOR_JS_TOOLS}/>
      </div>
      <Grid container direction="row" justify="space-between" className={classes.footer}>
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            {`created at: ${moment(published_at).fromNow()}`}
          </Typography>
        </Grid>
        <Grid item style={{ overflow: 'hidden' }}>
          <Typography variant="subtitle2" color="textSecondary">
            {`written by: ${post.author}`}
          </Typography>
        </Grid>
      </Grid>

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
            <Typography variant="h5" component="h3" color="textPrimary">
              Tags:{' '}
            </Typography>
            {tags &&
              tags.map((e, id) => (
                <Typography
                  variant="h5"
                  component="h3"
                  color="textSecondary"
                  className={classes.chip}
                  key={'tag' + id}
                >
                  {e.name}{' '}
                </Typography>
              ))}
          </div>
        </Grid>
      </Grid>

      {/* </Container> */}
    </>
  );
};

export default BlogPostPage;
