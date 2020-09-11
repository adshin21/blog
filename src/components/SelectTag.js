import { Multiselect } from 'react-widgets';
import React, { useState, useEffect } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import { makeStyles } from '@material-ui/core/styles';
import { getAllTags } from '../shared/endpoints';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    '& .rw-multiselect-taglist': {
      marginBottom: '8px',
    },
  },
}));


const CreateMultiselect = () =>  {
  
  let [value, setValue] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const getTags = async () => {
      setBusy(true);
      const res = await getAllTags();

      if(res.status === 200){
        setAllTags(res.data);
      }
      setBusy(false);
    };
    getTags();
  }, []);

  const handleCreate = (name) => {
    const exist = allTags.find(e => (e.name).toLowerCase() === name.toLowerCase())
    if(exist)
      return;

    let newOption = {
      name,
      id: allTags.length + 1
    }

    setValue([...value, newOption]);
    setAllTags([...allTags, newOption]);
  }
  
  const classes = useStyles();
  return (
    <Multiselect 
      className={classes.root}
      data={allTags}
      value={value}
      busy={busy}
      allowCreate="onFilter"
      onCreate={name => handleCreate(name.trim())}
      onChange={value => setValue(value)}
      textField="name"
      placeholder={'Select or create some tags related your post'}
    />
  )
}

export default CreateMultiselect;