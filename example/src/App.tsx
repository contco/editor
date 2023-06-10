/* eslint no-use-before-define: 0 */  // --> OFF
import React, { useState, useEffect } from 'react';
import { Editor } from 'editor';
import styled from 'styled-components';

const StyledEditor = styled(Editor)`
  height: 60vh;
  background-color: #fef9e7;
  overflow-y: auto;
`;

// const StyledRawViewer = styled(RawViewer)`
//   background-color: #f1f1f1;
// `;

const App = () => {
  const [document, setDocument] = useState<any>(blockInitalValue1);
  const [rawContent, setRawContent] = useState<any>(null);

  useEffect(() => {
    setDocument(blockInitalValue2);
  }, []);

  const onContentUpdate = (content: any) => {
    setRawContent(content.raw);
    setDocument(content.newChildren)
  };
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ minHeight: 200, width: '33vw' }}>
        <StyledEditor
          placeholder="Click anywhere to start typing"
          placeholderStyles={{ color: 'blue', fontWeight: 'bold' }}
          data={document}
          onContentUpdate={onContentUpdate}
        />
      </div>
      {/* <Viewer data={document} /> */}
      {/* {rawContent ? <StyledRawViewer data={rawContent} /> : null} */}
      <div>
        <h3>Raw Data</h3>
        <div style={{ width: '33vw', height: '500px', overflowY: 'scroll' }}>
          <pre>
            {JSON.stringify(rawContent || blockRawValue, undefined, 2)}
          </pre>
        </div>
      </div>
      <div>
        <h3>Serialized Data</h3>
        <div style={{ width: '33vw', height: '500px', overflowY: 'scroll' }}>
          <pre>
            {JSON.stringify(document, undefined, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
const blockInitalValue1 = [
  {
    id: '0',
    type: 'text',
    document: [
      {
        text: 'naa',
        properties: [],
      },
    ],
    createdBy: '',
  },
];
const blockInitalValue2 = [
  {
    id: '1',
    type: 'heading-one',
    document: [
      {
        text: '  Heading One',
        properties: ['i', 'u'],
      },
    ],
  },
  {
    id: '2',
    type: 'heading-two',
    document: [
      {
        text: '   Heading Two',
        properties: [],
      },
    ],
  },
  {
    id: '3',
    type: 'block-quote',
    document: [
      {
        text: 'What Goes Around Comes Around',
      },
    ],
  },
  {
    id: '4',
    type: 'text',
    document: [
      { text: '        This is editable, ', properties: [] },
      { text: 'rich ', properties: ['b'] },
      { text: 'text', properties: ['b', 'u'] },
      { text: ', much ', properties: ['b', 'i'] },
      { text: 'better than a' },
      { text: 'Hello World', properties: ['code'] },
      { text: 'link check', properties: ['a', 'https://google.com'] },
      { text: ' better than a' },
    ],
  },
  {
    id: '5',
    type: 'numbered-list',
    children: [
      {
        id: '6',
        type: 'list-item',
        document: [{ text: 'number list point 1', properties: [] }],
      },
      {
        id: '7',
        type: 'list-item',
        document: [{ text: 'number list point 2 ', properties: ['b'] }],
      },
    ],
  },
  {
    id: '8',
    type: 'bulleted-list',
    children: [
      {
        id: '9',
        type: 'list-item',
        document: [{ text: 'Bulleted list point 1', properties: [] }],
      },
      {
        id: '10',
        type: 'list-item',
        document: [{ text: 'Bulleted list point 2 ', properties: ['b'] }],
      },
    ],
  },
];

const blockRawValue = [
  {
    "id": "1",
    "type": "heading-one",
    "children": [
      {
        "text": "  Heading One",
        "italic": true,
        "underlined": true
      }
    ]
  },
  {
    "id": "2",
    "type": "heading-two",
    "children": [
      {
        "text": "   Heading Two"
      }
    ]
  },
  {
    "id": "3",
    "type": "block-quote",
    "children": [
      {
        "text": "What Goes Around Comes Around"
      }
    ]
  },
  {
    "id": "4",
    "type": "paragraph",
    "children": [
      {
        "text": "        This is editable, "
      },
      {
        "text": "rich ",
        "bold": true
      },
      {
        "text": "text",
        "bold": true,
        "underlined": true
      },
      {
        "text": ", much ",
        "bold": true,
        "italic": true
      },
      {
        "text": "better than a"
      },
      {
        "text": "Hello World",
        "code": true
      },
      {
        "type": "link",
        "url": "https://google.com",
        "children": [
          {
            "text": "link check"
          }
        ]
      },
      {
        "text": " better than a"
      }
    ]
  },
  {
    "id": "5",
    "type": "numbered-list",
    "children": [
      {
        "id": "6",
        "type": "list-item",
        "children": [
          {
            "text": "number list point 1"
          }
        ]
      },
      {
        "id": "7",
        "type": "list-item",
        "children": [
          {
            "text": "number list point 2 ",
            "bold": true
          }
        ]
      }
    ]
  },
  {
    "id": "8",
    "type": "bulleted-list",
    "children": [
      {
        "id": "9",
        "type": "list-item",
        "children": [
          {
            "text": ""
          }
        ]
      },
      {
        "id": "349748935370791158",
        "type": "list-item",
        "children": [
          {
            "text": "sBulleted list point 1"
          }
        ]
      },
      {
        "id": "10",
        "type": "list-item",
        "children": [
          {
            "text": "Bulleted list point 2 ",
            "bold": true
          }
        ]
      }
    ]
  }
]

export default App;
