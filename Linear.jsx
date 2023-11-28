import React, { useState } from 'react';
import * as math from 'mathjs';

const styles = {
  container: {
    width: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    marginBottom: '20px',
  },
  btn: {
    margin: '10px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '12px',
    fontSize: '15px',
  },
  input: {
    margin: '5px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  students: {
    marginTop: '20px',
  },
  year: {
    color: '#007BFF',
  },
  list: {
    listStyleType: 'none',
  },
};

function Linear({goBack}) {
  const [func, setFunc] = useState('x');
  const [x, setX] = useState(0); 
  const [result, setResult] = useState(null);

  const handleChangeFunc = (event) => {
    setFunc(event.target.value);
  };

  const handleChangeX = (event) => {
    setX(event.target.value); 
  };

  const calculateY = (x) => {
    try {
      return math.evaluate(func, { x });
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  const handleCalculate = () => {
    setResult(calculateY(x));
  };

  return (
    <div style={styles.container}>
      <button onClick={goBack} style={styles.btn}>Voltar</button>
      <input type="text" onChange={handleChangeFunc} placeholder="Insira a função matemática" style={styles.input} />
      <input type="number" onChange={handleChangeX} placeholder="Insira o valor de x" style={styles.input} /> {/* novo campo de entrada para x */}
      <button onClick={handleCalculate} style={styles.btn}>Calcular</button>
      {result !== null && <p style={styles.result}>Resultado: {result}</p>}
      <svg width="500" height="500">
        <line x1="0" y1="250" x2="500" y2="250" stroke="grey" />
        <line x1="250" y1="0" x2="250" y2="500" stroke="grey" />
        <text x="260" y="240">X</text>
        <text x="230" y="490">Y</text>
        <text x="250" y="260">0</text>
        <text x="500" y="260">250</text>
        <text x="250" y="0">250</text>
        <path d={
          `M 0 ${500 - calculateY(-250)}
          ${Array.from({length: 500}, (_, i) => `L ${i} ${500 - calculateY(i - 250)}`).join(' ')}
          `}
          stroke="black" fill="transparent" />
      </svg>
    </div>
  );
} 

export default Linear;
