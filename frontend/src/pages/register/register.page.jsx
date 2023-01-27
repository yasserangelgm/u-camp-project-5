import { useState } from 'react';
import axios from '../../api/axios';

function RegisterPage() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/signup',
        JSON.stringify(
          {
            name,
            lastName,
            email,
            password,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        )
      );
      console.log(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log('No hay respuesta del servisor');
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          required
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="lastname">Apellido:</label>
        <input
          type="text"
          id="lastname"
          autoComplete="off"
          required
          onChange={(e) => setLastName(e.target.value)}
        ></input>

        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>Registrar</button>
      </form>
    </div>
  );
}

export default RegisterPage;
