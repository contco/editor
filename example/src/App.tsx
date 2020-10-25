import React, { useState } from 'react'
import  Editor  from 'editor'
// // import 'editor/dist/index.css'
import Serialize from "./Serialize";
import Deseialize from "./Deserialize";

const App = () => {
   const [document1, setDocument1] = useState<any>(initialValue.children);
   const [document, setDocument] = useState<any>("");
   const [s, setS] = useState<any>("");

    const setContent1 = (content: any) => {
      setDocument1(content);
    };

    const setContent = (content: any) => {
      setDocument(content);
    };
  const handleSerialize = () =>{
    console.log("original editor content---->",document1);

     const s =  Serialize(initialValue);
     console.log("Serialize---->",s);
     setS(s);
     const doc = new DOMParser().parseFromString(s, 'text/html')
     const d =  Deseialize(doc.body)
    console.log(d);
    setDocument(d);
  }
  return (
    <>
      <h1>editor original content</h1>
      <Editor data={document1} setContent={setContent1} readOnly={false} />
      <h1>serialized html</h1>
      <div dangerouslySetInnerHTML={{ __html: s }} 
      />
      <h1>deserialized html to editor content</h1>
    {document !=="" ?<Editor data={document} setContent={setContent} readOnly={false} /> : ""}
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
      { text: 'Hello World', code: true },
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
    type: 'link',
    url: 'https://en.wikipedia.org/wiki/Hypertext',
    children: [{ text: 'hyperlinks' }],
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
