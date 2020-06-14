import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

import { getRecommendation } from '../shared/endpoints';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};

const SimpleList = ({ tags = [], slug = '' }) => {
  const classes = useStyles();
  const [spost, setSPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRecommendation({ tags: tags, slug: slug});
      setSPost(res.data);
    };

    if(tags.length)
      fetchData();
  }, [slug, tags]);


  if (!spost.length) {
    return <div>Nothing to show here.</div>;
  }

  return (
    <div className={classes.root}>
      {spost &&
        spost.map((e, id) => (
          <>
            <List key={id} component="nav" aria-label="main mailbox folders">
              <ListItemLink href={`/blogpost/${e.slug}`}>
                <ListItemText primary={e.title} />
              </ListItemLink>
            </List>
            <Divider />
          </>
        ))}
    </div>
  );
};

export default SimpleList;
