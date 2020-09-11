import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostPage from '../pages/BlogPostPage';
import Recommendation from '../components/Recommendation';
import { 
  Container,
  Grid,
  Typography
} from '@material-ui/core';

const BlogPost = () => {
  const params = useParams();
  const [post, setParentPost] = useState({});
  return (
    <>
      <Container maxWidth="md">
        <BlogPostPage params={params} setParentPost={setParentPost} />

        <Grid item key={Math.random()} style={{ marginTop: '10px', marginBottom: '5px' }}>
          <Typography variant="h5" component="h3" color="textPrimary">
            Related Article:{' '}
          </Typography>
            <Recommendation tags={post.tags} slug={post.slug} />
        </Grid>
      </Container>
    </>
  );
};

export default BlogPost;
