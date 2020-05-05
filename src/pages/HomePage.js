import React from 'react';
import { Typography, Grid, CssBaseline } from '@material-ui/core';
import HomePageCard from '../components/Cards/HomePageCard';

const HomePage = () => {
  console.log('Hello');
  return (
    <>
      {/* <CssBaseline /> */}
      <Grid
        overflow="hidden"
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <HomePageCard title="Agadfas dasdf asdf asdf as" />
        {/* <HomePageCard />
        <HomePageCard />
        <HomePageCard /> */}
      </Grid>
    </>
  );
};

export default HomePage;
