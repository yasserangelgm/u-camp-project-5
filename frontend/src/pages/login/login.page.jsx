import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const { setAuth } = useAuth();

  const { auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

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

      const accessToken = response?.data;

      setAuth(accessToken); //-------------------> Aqui se setea el accesToken a toda la app

      navigate(from, { replace: true });
    } catch (err) {
      if (err?.response) {
        console.log('No hay respuesta del servisor');
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {auth ? <i>{auth.accesToken}</i> : <i>No hay token</i>}
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
        <Link to="/signup">Ir al registro</Link>
      </form>
    </div>
  );
};

export default LoginPage;
