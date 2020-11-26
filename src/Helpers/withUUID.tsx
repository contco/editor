import { v4 as uuidv4 } from 'uuid';

const withUUID = (editor: any) => {
  const localEditor = editor;
  const { apply } = localEditor;
  localEditor.removedIDs = new Set();
  localEditor.apply = (operation: any) => {
    const newUUID = uuidv4();
    if (operation.type === 'insert_node' && operation.path.length === 1) {
      let idToUse = newUUID;
      if (localEditor.removedIDs.has(operation.id)) {
        idToUse = operation.id;
        localEditor.removedIDs.delete(idToUse);
      }
      return apply({
        ...operation,
        node: { ...operation.node, id: idToUse },
      });
    }
    if (operation.type === 'split_node' && operation.path.length === 1) {
      let idToUse = newUUID;
      if (localEditor.removedIDs.has(operation.id)) {
        idToUse = operation.id;
        localEditor.removedIDs.delete(idToUse);
      }
      return apply({
        ...operation,
        properties: { ...operation.properties, id: idToUse },
      });
    }
    if (operation.type === 'merge_node' && operation.path.length === 1) {
      localEditor.removedIDs.add(operation.properties.id);
      return apply(operation);
    }
    return apply(operation);
  };
  return localEditor;
};
export default withUUID;
