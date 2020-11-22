import React, { useState } from 'react';
import { Editor } from 'editor';

const App = () => {
  const [document, setDocument] = useState<any>(blockInitalValue);
  const [activeBlock, setActiveBlock] = useState<any>([]);
  const setContent = (content: any) => {
    setDocument(content);
  };
  console.log(document);
  console.log('activeBlock', activeBlock);
  return (
    <>
      <Editor data={blockInitalValue} setContent={setContent} setActiveBlock={setActiveBlock} />
    </>
  );
};

const blockInitalValue = [
  {
    block: {
      _id: '1',
      type: 'heading-one',
      properties: {
        document: [
          {
            text: '  Heading One',
            properties: [],
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
            properties: [],
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
          { text: 'better than a', properties: [] },
          { text: 'Hello World', properties: ['code'] },
        ],
      },
    },
  },
];
export default App;
