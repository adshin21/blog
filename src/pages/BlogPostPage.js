import React from 'react';
import { Container } from '@material-ui/core';
import { Editor } from '../components/Editor';

// import {
//   Container
// } from '@material-ui/core';

const BlogPostPage = ({ content }) => {
  return (
    <Container maxWidth="md">
      <div dangerouslySetInnerHTML={{ __html: content }} /> 
    </Container>
  );
};

export default BlogPostPage;
