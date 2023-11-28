import React, { useState } from 'react';

const styles = {
  container: {
    width: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

function Agrupamentos({goBack}) {
  const [students, setStudents] = useState([]);

  const addStudent = (name, year) => {
    setStudents([...students, { name, year }]);
  };

  const removeStudent = (name) => {
    setStudents(students.filter(student => student.name !== name));
  };

  const getStudentsByYear = (year) => {
    return students.filter(student => student.year === year);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Adicionar Estudante</h1>
      <form style={styles.form} onSubmit={(e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const year = parseInt(e.target.elements.year.value);
        addStudent(name, year);
      }}>
        <label>
          Nome:
          <input type="text" name="name" required style={styles.input} />
        </label>
        <label>
          Ano:
          <input type="number" name="year" min="1" required style={styles.input} />
        </label>
        <button type="submit" style={styles.btn}>Adicionar</button>
      </form>
      <form style={styles.form} onSubmit={(e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        removeStudent(name);
      }}>
        <label>
          Remover estudante pelo nome:
          <input type="text" name="name" required style={styles.input} />
        </label>
        <button type="submit" style={styles.btn}>Remover</button>
      </form>
      <div style={styles.students}>
        <h2 style={styles.title}>Estudantes por Ano</h2>
        {[...new Set(students.map(student => student.year))].sort().map(year => (
          <div key={year}>
            <h3 style={styles.year}>{year}º ano:</h3>
            <ul style={styles.list}>
              {getStudentsByYear(year).map((student, index) => (
                <li key={index}>{student.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={goBack} style={styles.btn}>Voltar</button>
    </div>
  );
}

export default Agrupamentos;
