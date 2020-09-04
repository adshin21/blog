import React, { useRef, useCallback, useEffect, memo } from 'react';
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';

const DEFAULT_ID = 'editorjs';

const Editor = (props) => {
  const {
    holderId: deprecatedId,
    holder: customHolderId,
    editorInstance,
    reinitializeOnPropsChange,
    children,
    tools,
    ...otherProps
  } = props;

  const instance = useRef(null);
  const holderId = deprecatedId || customHolderId || DEFAULT_ID;

  const initEditor = useCallback(async () => {
    if(!instance.current) {
      instance.current = new EditorJS({
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true
          },
          header: {
            class: Header,
          },
          ...tools
        },
        holder: holderId,
        i18n: {
          messages: {}
        },
        ...otherProps,
      });
    }

    if(editorInstance){
      await instance.current.isReady;
      editorInstance(instance.current)
    }

  }, [editorInstance, holderId, otherProps, tools]);


  const destroyEditor = useCallback(async () => {
    if(!instance.current)
      return true;

    await instance.current.isReady;
    instance.current.destroy();
    instance.current = null;
    return true;
  } , [instance]);


  useEffect(() => {
    initEditor();
    return () => destroyEditor();
  } , []); // eslint-disable-line 

  useEffect(() => {
    const doEffect = async () => {
      if (!reinitializeOnPropsChange) {
        return
      }

      await destroyEditor()
      initEditor()
    }

    doEffect()
  }, [destroyEditor, initEditor, instance, reinitializeOnPropsChange])

  return children || <div id={holderId} />

}

export default memo(Editor)

