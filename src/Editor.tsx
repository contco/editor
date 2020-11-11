import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Fragment
} from 'react'
import { createEditor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

import { ToolBar } from './ToolBar'
import { withLinks } from './Helpers/LinkHelper'
import { Element } from './plugins/Element'
import { Leaf } from './plugins/Leaf'
import { withHistory } from 'slate-history'

import serialize from './serialize/index'
import deserialize from './deserialize/index'

interface Props {
  data?: any
  setContent: (content: any) => void
  initialData?: any
  readOnly?: boolean
  attributes?: any
  element?: any
}
const Editor: (props: Props) => any = ({
  data,
  setContent,
  readOnly = false
}) => {
  const [editorData, setData] = useState([])
  const editor = useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    []
  )
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  useEffect(() => {
    const initialData = deserialize(data)
    setData(initialData)
  }, [])

  const onChangeContent = (newData: any) => {
    setData(newData)
    console.log('newData', newData)
    setContent(serialize(newData))
  }

  console.log(editorData)
  return (
    <Fragment>
      <Slate
        editor={editor}
        value={editorData}
        onChange={(newValue: any) => onChangeContent(newValue)}
      >
        <ToolBar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly={readOnly}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              Transforms.insertNodes(editor, {
                type: 'paragraph',
                children: [{ text: '' }]
              })
            }
          }}
        />
      </Slate>
    </Fragment>
  )
}

export default React.memo(Editor)
