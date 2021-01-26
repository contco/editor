import React, { useState, useEffect } from 'react';
import { Editor, Viewer } from 'editor';

const App = () => {
  const [document, setDocument] = useState<any>(blockInitalValue1);

  useEffect(() => {
    setDocument(blockInitalValue2);
  }, []);

  const onContentUpdate = (content: any) => {
    console.log(content);
  };
  console.log(document);
  return (
    <>
      <Editor data={document} onContentUpdate={onContentUpdate} />
      <Viewer data={document} />
    </>
  );
};
const blockInitalValue1 = [
  {
    block: {
      _id: '',
      type: 'text',
      properties: {
        document: [
          {
            text: '',
            properties: [],
          },
        ],
      },
      createdBy: '',
    },
  },
];
const blockInitalValue2 = [
  {
    block: {
      _id: '1',
      type: 'heading-one',
      properties: {
        document: [
          {
            text: '  Heading One',
            properties: ['i', 'u'],
          },
        ],
      },
    },
  },
  {
    block: {
      _id: '2',
      type: 'heading-two',
      properties: {
        document: [
          {
            text: '   Heading Two',
            properties: [],
          },
        ],
      },
    },
  },
  {
    block: {
      _id: '3',
      type: 'block-quote',
      properties: {
        document: [
          {
            text: 'What Goes Around Comes Around',
          },
        ],
      },
    },
  },
  {
    block: {
      _id: '4',
      type: 'text',
      properties: {
        document: [
          { text: '        This is editable, ', properties: [] },
          { text: 'rich ', properties: ['b'] },
          { text: 'text', properties: ['b', 'u'] },
          { text: ', much ', properties: ['b', 'i'] },
          { text: 'better than a' },
          { text: 'Hello World', properties: ['code'] },
          { text: 'link check', properties: ['a', 'https://google.com'] },
        ],
      },
    },
  },
];
export default App;
