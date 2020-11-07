import React, { useState } from 'react'
import  { Editor }  from "editor";
import {serializeHTML} from './serialization';
import {deserialization} from "./deserialization";

const App = () => {
   const [document1, setDocument1] = useState<any>(initialValue.children);
   const [serializedData ,setSerializedData] = useState();
    const setContent1 = (content: any) => {
      setDocument1(content);
     let serialized =  serializeHTML(content);
     setSerializedData(serialized);
     let deserialized = deserialization(serialized);
      console.log("d", deserialized);
    };

    console.log(serializedData);
    console.log(document1);
  return (
    <>
      <Editor data={document1} setContent={setContent1} readOnly={false} />

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
],
}

export default App
