import React, { useState } from 'react';

const MatrixInput = ({goBack}) => {
  const [values, setValues] = useState([['']]);
  const [total, setTotal] = useState(0);
  const [printValues, setPrintValues] = useState(null);

  const handleInputChange = (e, i, j) => {
    const newValues = [...values];
    newValues[i][j] = e.target.value;
    setValues(newValues);
  };

  const addRow = () => {
    setValues([...values, ['']]);
  };

  const removeRow = () => {
    if (values.length > 1) {
      const newValues = values.slice(0, -1);
      setValues(newValues);
    }
  };

  const addColumn = () => {
    setValues(values.map(row => [...row, '']));
  };

  const removeColumn = () => {
    if (values[0].length > 1) {
      const newValues = values.map(row => row.slice(0, -1));
      setValues(newValues);
    }
  };

  const calculateTotal = () => {
    let totalValue = 0;
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        const value = Number(values[i][j]);
        if (isNaN(value)) {
          setTotal("Existem valores na matriz que não são numeros");
          return;
        }
        totalValue += value;
      }
    }
    setTotal(totalValue);
  };

  const printMatrix = () => {
    setPrintValues(values);
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

  const inputStyle = {
    margin: "5px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box"
  };

  return (
    <div>
      <button style={buttonStyle} onClick={goBack}>Voltar</button>
      {values.map((row, i) => (
        <div key={i}>
          {row.map((value, j) => (
            <input
              style={inputStyle}
              key={j}
              type="text"
              value={value}
              onChange={e => handleInputChange(e, i, j)}
            />
          ))}
        </div>
      ))}
      <div>
        <h1>Gerenciar Matriz</h1>
        <button style={buttonStyle} onClick={addRow}>Adicionar linha</button>
        <button style={buttonStyle} onClick={removeRow}>Remover linha</button>
        <button style={buttonStyle} onClick={addColumn}>Adicionar coluna</button>
        <button style={buttonStyle} onClick={removeColumn}>Remover coluna</button>
      </div>
      <div>
        <h1>Operações</h1>
        <button style={buttonStyle} onClick={calculateTotal}>Calcular Total</button>
        <button style={buttonStyle} onClick={printMatrix}>Imprimir Matriz</button>
      </div>
      <h2>Total: {total}</h2>
      {printValues && <div>
        <h2>Matriz:</h2>
        {printValues.map((row, i) => (
          <div key={i}>
            {row.join(', ')}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default MatrixInput;
