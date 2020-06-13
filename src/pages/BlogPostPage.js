import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../shared/endpoints';
import SimpleList from '../components/Recommendation';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
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

const BlogPostPage = ({params, setParentPost}) => {
  const [post, setPost] = useState({});

  const classes = useStyles();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await getPostDetail(params.slug);
      setPost(res.data);
      setParentPost(res.data);
    };
    fetchdata();
  }, []);

  const { tags, published_at } = post;

  return (
    <>
      <CssBaseline />
        <Grid container>
          <Typography variant="h3" component="h3">
            {post.title}
          </Typography>
        </Grid>

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

        <div
          style={{
            fontSize: '16px',
            marginBottom: '5px',
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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
