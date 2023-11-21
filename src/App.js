import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    age: 0,
    nationality: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:32784/api/Auth/login', {
        email: "yeinermeri@gmail.com",
        password: "0123456789",
      });

      const authToken = response.data;
      setToken(authToken);
      console.log('Inicio de sesión exitoso. Token:', authToken);
    } catch (error) {
      setError('A ocurrido un error al iniciar sesion.');
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://localhost:32784/api/User', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error.message);
    }
  };

  const handleCreateUser = async () => {
    // Validar campos requeridos
    if (!newUser.name || !newUser.email) {
      setFormErrors({
        name: newUser.name ? '' : 'El nombre es requerido.',
        email: newUser.email ? '' : 'El correo electrónico es requerido.',
      });
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      setFormErrors({
        ...formErrors,
        email: 'El formato del correo electrónico no es válido.',
      });
      return;
    }

    try {
      await axios.post('https://localhost:32784/api/User', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Limpiar el formulario después de la creación exitosa
      setNewUser({
        name: '',
        email: '',
        age: 0,
        nationality: '',
      });
      // Limpiar los mensajes de error
      setFormErrors({
        name: '',
        email: '',
      });
      // Recargar los datos después de la creación del usuario
      fetchUserData();
    } catch (error) {
      console.error('Error al crear usuario:', error.message);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Nombre', accessor: 'name' },
      { Header: 'Correo Electrónico', accessor: 'email' },
      { Header: 'Edad', accessor: 'age' },
      { Header: 'Nacionalidad', accessor: 'nationality' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: userData });

  return (
    <div className="container mt-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {token && (
        <div>
          <h2>Token de Autenticación:</h2>
          <p>{token}</p>
          <h2>Datos de Usuario:</h2>
          <table {...getTableProps()} className="table table-bordered table-hover">
            <thead className="thead-dark">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h2>Crear Nuevo Usuario:</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre:</label>
              <input
                type="text"
                className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico:</label>
              <input
                type="email"
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                id="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Edad:</label>
              <input
                type="number"
                className="form-control"
                id="age"
                value={newUser.age}
                onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value, 10) })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nationality" className="form-label">Nacionalidad:</label>
              <input
                type="text"
                className="form-control"
                id="nationality"
                value={newUser.nationality}
                onChange={(e) => setNewUser({ ...newUser, nationality: e.target.value })}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleCreateUser}>
              Crear Usuario
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
