import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { history } from '../App';

import Pagination from '@material-ui/lab/Pagination';

import HomePageCard from '../components/Cards/HomePageCard';
import { useParams } from 'react-router-dom';

import { getPostList } from '../shared/endpoints';

const HomePage = () => {
  const [posts, setPost] = useState({ results: [] });
  const [pageNumber, setPageNumber] = useState(1);

  const params = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await getPostList(params.pageNumber || pageNumber);
      setPageNumber(params.pagenumber);
      setPost(res.data);
      window.scrollTo(0,0);
    };
    fetchData();
  }, [params.pagenumber]);

  const handleChange =  (event , value) => {
    event.preventDefault();
    setPageNumber(value);
    history.push(`/posts/page/${value}`);
  }

  return (
    <>
      <Grid overflow="hidden" container direction="column" justify="center" alignItems="center">
        {posts.results.map((post, idx) => (
          <HomePageCard
            key={idx}
            title={post.title}
            tag={post.tags}
            slug={post.slug}
            author={post.author}
            date={post.published_at}
          />
        ))}
        <Pagination 
          count={(Math.floor((posts.count + 9) / 10))} 
          defaultPage={1} 
          boundaryCount={2}
          page={+pageNumber} 
          onChange={handleChange}
        />{' '}
      </Grid>
    </>
  );
};

export default HomePage;
