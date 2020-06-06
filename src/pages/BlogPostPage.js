import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import {
  getPostDetail
} from '../shared/HomePage';

const BlogPostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({})
  useEffect(() => {
    const fetchdata = async () => {
      const res = await getPostDetail(params['slug']);
      setPost(res.data);
    };
    fetchdata();
  }, []);

  return (
    <Container maxWidth="md">
      <div dangerouslySetInnerHTML={{ __html: post.content }} /> 
    </Container>  
  );
};

export default BlogPostPage;
