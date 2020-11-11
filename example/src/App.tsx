import React, { useState } from 'react'
import  { Editor }  from "editor";

const App = () => {
   const [document, setDocument] = useState<any>(blockInitalValue);
    const setContent = (content: any) => {
      setDocument(content);
    };
    console.log(document);
  return (
    <>
      <Editor data={blockInitalValue} setContent={setContent} readOnly={false} />

  </>
  )
}


const blockInitalValue = [
  {
    type: "heading-one",
    properties: {
      document: [
        {
        text: "  Heading One",
        properties: []
      }
    ]
    }
  },
  {
    type: "heading-two",
    properties: {
      document: [
        {
        text: "   Heading Two",
        properties: []
      }
    ]
    }
  },
  {
    type: "block-quote",
    properties: {
      document: [
        {
        text: "What Goes Around Comes Around",
        properties: []
      }
    ]
    }
  },
  {
    type: "text",
      properties: {
        document: [
          {text: "        This is editable, ", properties: []},
          {text: "rich ", properties: ['b']},
          {text: "text", properties: ['b', 'u']},
          {text: ", much ", properties: ['b', 'i']},
          {text: "better than a", properties: []},
          {text: "Hello World", properties: ['code']},
        ]
      }
  }
];
export default App
