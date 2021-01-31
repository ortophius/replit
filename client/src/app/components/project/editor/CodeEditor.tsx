import Editor, { Monaco } from '@monaco-editor/react';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import { OPTIONS } from '~/app/constants/options.constant';
import { darkTheme, lightTheme } from '~/app/constants/theme.constant';
import { getStorage } from '~/app/helpers/options.helper';
import { infoPosition } from '../info/LineColumn';

export let editorRef: React.MutableRefObject<any> | null = null;

interface CodeEditorProps {
  language: string;
  value: string;
  onChanged: Dispatch<SetStateAction<string>>;
}

export default function CodeEditor(props: CodeEditorProps) {
  const { language, value, onChanged } = props;

  editorRef = useRef(null);

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme(OPTIONS.themes.darkTheme, {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': `${darkTheme.beta}`,
        'editor.lineHighlightBackground': `${darkTheme.editorLine}`,
        'dropdown.background': `${darkTheme.gamma}`,
        'editorWidget.background': `${darkTheme.gamma}`
      }
    });

    monaco.editor.defineTheme(OPTIONS.themes.lightTheme, {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': `${lightTheme.beta}`,
        'editor.lineHighlightBackground': `${lightTheme.editorLine}`,
        'editorLineNumber.foreground': `${lightTheme.editorLineNum}`,
        'editorCursor.foreground': `${lightTheme.alpha}`,
        'dropdown.background': `${lightTheme.gamma}`,
        'editorWidget.background': `${lightTheme.gamma}`
      }
    });
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    editor.onDidChangeCursorPosition(() => {
      const cursorCoords = editor.getPosition();
      infoPosition.line.current.innerText = cursorCoords.lineNumber;
      infoPosition.col.current.innerText = cursorCoords.column;
    });
  };

  const handleChange = (value: string): any => {
    onChanged(value);
  };

  return (
    <div className="editor">
      <div className="editor__header">
        <h3 className="editor__title">{language}</h3>
      </div>
      <Editor
        className="editor__content"
        language={language}
        value={value}
        onChange={handleChange}
        theme={
          getStorage(OPTIONS.themes.storageName) === OPTIONS.themes.light
            ? OPTIONS.themes.lightTheme
            : OPTIONS.themes.darkTheme
        }
        options={{
          minimap: {
            enabled: false
          },
          tabSize: +getStorage(OPTIONS.settings.indentSize.storageName) || OPTIONS.settings.indentSize.defaultValue,
          fontSize: +getStorage(OPTIONS.settings.fontSize.storageName) || OPTIONS.settings.fontSize.defaultValue,
          wordWrap: 'on',
          wordWrapColumn: 80
        }}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
