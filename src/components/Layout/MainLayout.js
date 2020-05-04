import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Header, Footer } from '../Layout';
import { Grid, Paper, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const MainLayout = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item>
          <Container style={{textAlign:"center"}}>{children}</Container>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default MainLayout;
