import { useState } from 'react'
import Tree from './Tree'
import Graficos from './Graficos'
import Linear from './Linear'
import MatrixInput from './MatrixInput'
import Agrupamentos from './Agrupamentos'

function App() {
  const [page, setPage] = useState('home')

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

  const centerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };
    
  const renderPage = () => {
    switch(page) {
      case 'Tree': return <Tree goBack={() => setPage('home')} />
      case 'Graficos': return <Graficos goBack={() => setPage('home')} />
      case 'Linear': return <Linear goBack={() => setPage('home')} />
      case 'MatrixInput': return <MatrixInput goBack={() => setPage('home')} />
      case 'Agrupamentos': return <Agrupamentos goBack={() => setPage('home')} />

      
      default: return (
        <div style={centerStyle}>
          <h1>V2 Matenática Discreta</h1>
          <button style={buttonStyle} onClick={() => setPage('Agrupamentos')}>Ir para Agrupamentos</button>
          <button style={buttonStyle} onClick={() => setPage('Tree')}>Ir para Arvore</button>
          <button style={buttonStyle} onClick={() => setPage('Graficos')}>Ir para Graficos</button>
          <button style={buttonStyle} onClick={() => setPage('Linear')}>Ir para Linear</button>
          <button style={buttonStyle} onClick={() => setPage('MatrixInput')}>Ir para Matrix</button>
        </div>
      )
    }
  }

  return renderPage()
}

export default App
