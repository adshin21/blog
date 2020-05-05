import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .ql-editor': {
      overflowY: 'auto',
      resize: 'vertical',
      minHeight: '10em',
      width: '100%',
    },
    marginBottom: 10,
  },
}));

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'script',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

const Editor = ({ content, handleChange, placeholder }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        bounds={'.app'}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Editor;
