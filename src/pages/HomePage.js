import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import HomePageCard from '../components/Cards/HomePageCard';

import {
  getPostList 
} from '../shared/HomePage';

const HomePage = () => {
  
  const [posts, setPost] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPostList();
      setPost(res.data);
    };
    fetchData();
  }, []);
  
  return (
    <>
      <Grid
        overflow="hidden"
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        
        {
          posts.results.map( (post, idx) => (
            <HomePageCard 
              key={idx}
              title={post.title}
              tag={post.tags}
              slug={post.slug}
              author={post.author}
              date={post.published_at} 
            />
            ) 
          )
        }
      </Grid>
    </>
  );
};

export default HomePage;
