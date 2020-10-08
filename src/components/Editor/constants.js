import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import Delimiter from '@editorjs/delimiter';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Code from '@editorjs/code';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Underline from '@editorjs/underline';
import ImageTool from '@editorjs/image';
import Gist from 'editorjs-github-gist-plugin';
import Cookies from 'js-cookie';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  header: {
    class: Header,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  code: { 
    class: Code,
    inlineToolbar: true, 
  },
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: process.env.REACT_APP_API_URL + 'posts/image/upload/',
        byUrl: process.env.REACT_APP_API_URL + 'posts/image/upload/'
      },
      additionalRequestHeaders: {
        Authorization: `Bearer ${Cookies.get('__access_token')}`
      }
    }
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  gist: Gist,
  delimiter: {
    class: Delimiter,
  },
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  Marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M',
  },
  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+M',
  },
  underline: Underline,
};
