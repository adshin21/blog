import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import { history } from '../../App';
import TagChip from '../TagChip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: 600,
    maxWidth: 600,
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'transform .25s',
    }
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
    marginTop: theme.spacing(0.5)
  },
}));

const HomePageCard = ({ title, slug, tag = [], date, author = 'anonymous' }) => {
  const classes = useStyles();
  const [elevation, setElevation] = useState(3);

  return (
    <Grid item style={{ marginBottom: '16px' }}>
      <Card className={classes.root} elevation={elevation} onMouseOver={e => setElevation(10)} onMouseOut={e => setElevation(3)}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <CardActionArea onClick={() => history.push(`/blogpost/${slug}`)}>
              <Typography component="h5" variant="h5">
                {title}
              </Typography>
            </CardActionArea>

            <TagChip tags={tag} small={true} className={classes.tag}/>
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
