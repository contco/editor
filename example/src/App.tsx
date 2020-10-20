import React, { useState } from 'react'
import  Editor  from 'editor'
// // import 'editor/dist/index.css'
import Serialize from "./Serialize";
import Deseialize from "./Deserialize";

const App = () => {
   const [document, setDocument] = useState<any>("");

    const setContent = (content: any) => {
      setDocument(content);
    };
  const handleSerialize = () =>{
     const s =  Serialize(initialValue);
     console.log(s);

     const doc = new DOMParser().parseFromString(s, 'text/html')
     const d =  Deseialize(doc.body)


    console.log(d);
    setDocument(d);
  }
  return (
    <>
    {document !="" ?<Editor data={document} setContent={setContent} readOnly={false} /> : ""}
      <button onClick={handleSerialize}>serialize</button>
  </>
  )
}

const initialValue = {
  children: [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
],
}

export default App
