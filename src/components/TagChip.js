import React from 'react';
import { Chip, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    marginTop: theme.spacing(0.5),
  },
  chippad: {
    padding: theme.spacing(1),
  },
  chip: {
    marginLeft: theme.spacing(0.5),
  },
}));

const TagChip = (props) => {
  const classes = useStyles();
  const { tags, small } = props;
  return (
    <div className={classes.root}>
      {tags?.map((tag, id) => (
        <Chip
          key={id}
          className={clsx(classes.chippad, id !== 0 && classes.chip)}
          label={<Typography variant={ small ? "subtitle1" : "h6"} component={small ? "subtitle2" : "h4"}>{tag.name}</Typography>}
          size={small ? 'small' : 'medium'}
          component="a"
          href="#"
          clickable
        />
      ))}
    </div>
  );
};

export default TagChip;
