import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';


import moment from 'moment';

import {
  ThumbUp as ThumbUpIcon,
  Person as PersonIcon,
} from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: 600,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  cardActionArea: {
    display: 'block',
    width: 151,
  },
}));

const HomePageCard = ({
  title = 'Not specfied adfasd dslafksdjfasdkj asdlfkjas;dfklja salskdfjak;l sj;asdf',
  tag = 'Seg Tree, Bit Masking, DP',
  date = '2020-03-01T18:30:00.000Z',
  user = 'adshin21'
}) => {
  const classes = useStyles();
  const theme = useTheme();

  console.log(moment('2020-03-01T18:30:00.000Z').fromNow());
  return (
    <Grid item style={{ marginBottom: '16px' }}>
      <Card className={classes.root}>
        <CardActionArea className={classes.cardActionArea}>
          <CardMedia
            className={classes.cover}
            component="img"
            src="https://picsum.photos/500/500"
            title="Live from space album cover"
          />
        </CardActionArea>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <CardActionArea style={{ display: 'block' }}>
              <div style={{ width: 400 }}>
                <Typography component="h5" variant="h5" noWrap={true}>
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {tag}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {moment(date).fromNow()}
                </Typography>
              </div>
            </CardActionArea>
          </CardContent>
          <Grid container direction="row" justify="space-between" alignItems="flex-start">
            <Grid item>
              <IconButton aria-label="previous">
                <ThumbUpIcon />
              </IconButton>
              {<b>11</b>}
            </Grid>

            <Grid item>
              <IconButton aria-label="previous">
                <PersonIcon />
              </IconButton>
              {<b>{user}</b>}
            </Grid>
          </Grid>
        </div>
      </Card>
    </Grid>
  );
};

export default HomePageCard;
