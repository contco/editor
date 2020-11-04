import React, { useState } from 'react'
import  { Editor }  from "editor";

const App = () => {
   const [document1, setDocument1] = useState<any>(initialValue.children);
  
    const setContent1 = (content: any) => {
      setDocument1(content);
    };

  return (
      <Editor data={document1} setContent={setContent1} />
  )
}

const initialValue = {
  children: [
  {
    type: 'heading-one',
    children: [{ text: "Heading 1" }],
  },
  {
    type: 'heading-two',
    children: [{ text: "Heading 2" }],
  },
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
          ', or add a semantically rendered block quote in the middle of the page, like this: ',
      },
      {  
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlinks' }],
      }
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
