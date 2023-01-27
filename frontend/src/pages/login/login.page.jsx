import { useState, useContext } from 'react';
import AuthContext from '../../context/authProvider';
import axios from '../../api/axios';

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/signin',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const accesToken = response?.data?.token;
      setAuth(accesToken);
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
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <button>Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
