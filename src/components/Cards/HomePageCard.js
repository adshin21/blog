import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import {
  Breadcrumbs,
  Chip,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';

import moment from 'moment';

import { history } from '../../App';

// import { ThumbUp as ThumbUpIcon, Person as PersonIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: 600,
    maxWidth: 600,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  cardActionArea: {
    display: 'block',
  },
  footer: {
    maxWidth: '570px',
    marginRight: '30px',
    marginLeft: '15px',
    marginBottom: '10px',
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
  },
  chip: {
    margin: theme.spacing(0.25),
  },
}));

const HomePageCard = ({ title, slug, tag = [], date, author = 'anonymous' }) => {
  const classes = useStyles();
  // const theme = useTheme();
  const preventDefault = (event) => event.preventDefault();

  return (
    <Grid item style={{ marginBottom: '16px' }}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <CardActionArea onClick={() => history.push(`/blogpost/${slug}`)}>
              <Typography component="h5" variant="h5">
                {title}
              </Typography>
            </CardActionArea>

            <div className={classes.tag}>
              {tag.map((e, id) => (
                <Typography variant="subtitle2" color="textSecondary" className={classes.chip} key={"tag" + id}>
                  {e.name}
                </Typography>
              ))}
            </div>
          </CardContent>

          <Grid container direction="row" justify="space-between" className={classes.footer}>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {moment(date).fromNow()}
              </Typography>
            </Grid>
            <Grid item style={{ overflow: 'hidden' }}>
              <Typography variant="subtitle2" color="textSecondary">
                {author}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Card>
    </Grid>
  );
};

export default HomePageCard;
