import React, { useState, useCallback } from 'react';

const Graficos = ({goBack}) => {
  const [data, setData] = useState([25, 30, 45, 60, 20]);
  const [chartType, setChartType] = useState('bar');

  const handleChange = (event, index) => {
    const newData = [...data];
    newData[index] = Number(event.target.value);
    setData(newData);
  };

  const getCoordinatesForPercent = useCallback((percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }, []);

  const sum = useCallback((array) => {
    return array.reduce((a, b) => a + b, 0);
  }, []);

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return data.map((value, index) => (
          <rect
            key={index}
            x={10 + index * 70}
            y={300 - value}
            width="50"
            height={value}
            fill="blue"
          />
        ));
      case 'area': 
        return (
          <polygon
            points={data.map((value, index) => `${index * 70},${300 - value}`).join(' ') + ` ${data.length * 70 - 70},300 0,300`}
            fill="green"
          />
        );
      case 'scatter': 
        return data.map((value, index) => (
          <circle
            key={index}
            cx={10 + index * 70}
            cy={300 - value}
            r="10"
            fill={colors[index]}
          />
        ));
      case 'line':
        return (
          <polyline
            points={data.map((value, index) => `${index * 70},${300 - value}`).join(' ')}
            fill="none"
            stroke="red"
            strokeWidth="2"
          />
        );
      default:
        return null;
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

  const inputStyle = {
    margin: "5px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box"
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  };

  return (
    <div>
      <div style={buttonContainerStyle}>
        <button onClick={goBack} style={buttonStyle}>Voltar</button>
        <button onClick={() => setChartType('bar')} style={buttonStyle}>Bar Chart</button>
        <button onClick={() => setChartType('area')} style={buttonStyle}>Area Chart</button> 
        <button onClick={() => setChartType('scatter')} style={buttonStyle}>Scatter Chart</button>
        <button onClick={() => setChartType('line')} style={buttonStyle}>Line Chart</button>
        {data.map((value, index) => (
          <input
            key={index}
            type="number"
            value={value}
            onChange={(event) => handleChange(event, index)}
            style={inputStyle}
          />
        ))}
      </div>
      <svg width="500" height="300">
        {renderChart()}
      </svg>
    </div>
  );
};

export default Graficos;

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
