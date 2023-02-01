import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './login.styles.css';

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

      const accessToken = response?.data.accessToken;
      const role = response?.data.user.role;

      console.log(response?.data.user.role);
      setAuth({ role, accessToken }); //-------------------> Aqui se setea el accesToken a toda la app
      setEmail('');
      setPassword(''); //TODO Alert success
      console.log(auth);
      navigate(from, { replace: true });
    } catch (err) {
      if (err?.response) {
        console.log('No hay respuesta del servidor'); //TODO manejar los distintos tipos de errores
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {auth ? <i>{auth.accesToken}</i> : <i>No hay token</i>}
      <form onSubmit={handleSubmit} className="login-form">
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
