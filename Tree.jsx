import React, { useState } from 'react';

function TreeNode({ node, addChild, removeNode, updateNodeName, buttonStyle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(node.name);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNameUpdate = () => {
    updateNodeName(node.id, newName);
    setIsEditing(false);
  };

  const inputStyle = {
    margin: "5px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box"
  };

  return (
    <li>
      <div>
        {isEditing ? (
          <>
            <input type="text" value={newName} onChange={handleNameChange} style={inputStyle} />
            <button onClick={handleNameUpdate} style={buttonStyle}>Atualizar nome</button>
          </>
        ) : (
          <>
            {node.name}
            <button onClick={() => setIsEditing(true)} style={buttonStyle}>Editar nome</button>
            <button onClick={() => addChild(node.id)} style={buttonStyle}>Adicionar ramificação</button>
            <button onClick={() => removeNode(node.id)} style={buttonStyle}>Remover</button>
          </>
        )}
      </div>
      {node.children.length > 0 && (
        <ul>
          {node.children.map(childNode => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              addChild={addChild}
              removeNode={removeNode}
              updateNodeName={updateNodeName}
              buttonStyle={buttonStyle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Tree({ goBack }) {
  const [tree, setTree] = useState({
    name: 'Raiz',
    id: 0,
    children: []
  });
  const [counter, setCounter] = useState(1);

  const addChild = parentId => {
    const newTree = JSON.parse(JSON.stringify(tree));
    const parent = findNode(newTree, parentId);
    const newId = counter;
    parent.children.push({
      name: `Nó ${newId}`,
      id: newId,
      children: []
    });
    setTree(newTree);
    setCounter(counter + 1);
  };

  const removeNode = nodeId => {
    const newTree = JSON.parse(JSON.stringify(tree));
    if (newTree.id === nodeId) {
      setTree({ name: 'Raiz', id: 0, children: [] });
    } else {
      const parent = findParent(newTree, nodeId);
      parent.children = parent.children.filter(child => child.id !== nodeId);
      setTree(newTree);
    }
  };

  const updateNodeName = (nodeId, newName) => {
    const newTree = JSON.parse(JSON.stringify(tree));
    const node = findNode(newTree, nodeId);
    node.name = newName;
    setTree(newTree);
  };

  const findNode = (node, id) => {
    if (node.id === id) return node;
    for (let child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  };

  const findParent = (node, id, parent) => {
    if (node.id === id) return parent;
    for (let child of node.children) {
      const found = findParent(child, id, node);
      if (found) return found;
    }
  };

  const buttonStyle = {
    margin: "10px",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "12px",
    fontSize: "15px"
  };

  return (
    <div>
      <TreeNode node={tree} addChild={addChild} removeNode={removeNode} updateNodeName={updateNodeName} buttonStyle={buttonStyle} />
      <button onClick={goBack} style={buttonStyle}>Voltar</button>
    </div>
  );
}
