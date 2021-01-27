import React, { useState, useEffect } from 'react';
import { Editor, Viewer } from 'editor';

const App = () => {
  const [document, setDocument] = useState<any>([]);

  useEffect(() => {
    setDocument(blockInitalValue);
  }, []);

  const onContentUpdate = (content: any) => {
    console.log(content);
  };
  console.log(document);
  return (
    <>
      <Editor data={blockInitalValue} onContentUpdate={onContentUpdate} />
      <Viewer data={blockInitalValue} />
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
  {
    block: {
      _id: '4',
      type: 'numbered-list',
      children: [
        {
          block: {
            _id: '1',
            type: 'list-item',
            properties: {
              document: [
                { text: 'This is editable, ', properties: [] },
                { text: 'rich ', properties: ['b'] },
                { text: 'text', properties: ['b', 'u'] },
                { text: ', much ', properties: ['b', 'i'] },
                { text: 'better than a', properties: [] },
                { text: 'Hello World', properties: ['code'] },
              ],
            },
          },
        },
        {
          block: {
            _id: '2',
            type: 'list-item',
            properties: {
              document: [
                { text: 'This is editable, ', properties: [] },
                { text: 'rich ', properties: ['b'] },
                { text: 'text', properties: ['b', 'u'] },
                { text: ', much ', properties: ['b', 'i'] },
                { text: 'better than a', properties: [] },
                { text: 'Hello World', properties: ['code'] },
              ],
            },
          },
        },
      ],
    },
  },
  {
    block: {
      _id: '5',
      type: 'bulleted-list',
      children: [
        {
          block: {
            _id: '4',
            type: 'list-item',
            properties: {
              document: [
                { text: 'This is editable, ', properties: [] },
                { text: 'rich ', properties: ['b'] },
                { text: 'text', properties: ['b', 'u'] },
                { text: ', much ', properties: ['b', 'i'] },
                { text: 'better than a', properties: [] },
                { text: 'Hello World', properties: ['code'] },
              ],
            },
          },
        },
      ],
    },
  },
];
export default App;
