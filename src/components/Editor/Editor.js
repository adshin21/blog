import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import hljs from 'highlight.js';
import 'highlight.js/styles/darcula.css';

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
  syntax: {
    highlight: text => hljs.highlightAuto(text).value,
  },  
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
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
  'code-block',
  'script',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

const Editor = ({ content, handleChange, placeholder, theme, readOnly }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <ReactQuill
        theme={'snow'}
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        bounds={'.app'}
        placeholder={placeholder}
        readOnly={ readOnly || false }
      />
    </div>
  );
};

export default Editor;
