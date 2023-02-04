import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import axios from '../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './login.styles.css';

const LoginPage = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const { currentUser, setCurrentUser } = useUser();
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

      setAuth({ role, accessToken }); //-------------------> Aqui se setea el accesToken a toda la app
      setCurrentUser(response?.data.user);

      setEmail('');
      setPassword(''); //TODO Alert success

      navigate(from, { replace: true });
    } catch (err) {
      if (err?.response) {
        console.log('No hay respuesta del servidor'); //TODO manejar los distintos tipos de errores
      } else {
        console.log(err);
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);
  return (
    <>
      <Container className="py-4">
        <h1 className="py-2 text-center">Tu cuenta</h1>
        <Container className="py-3 px-4 login-form-container">
          <form onSubmit={handleSubmit}>
            <h3>Iniciar sesión</h3>
            <div className="form-group mb-3">
              <input
                id="email"
                type="email"
                placeholder="Escriba su e-mail"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                Nunca compartiremos tu correo con nadie más.
              </Form.Text>
            </div>

            <div className="form-group mb-3">
              <input
                id="password"
                type="password"
                placeholder="Escriba su contraseña"
                className="form-control shadow-none text-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              variant="ligth"
              type="submit"
              className="app-button bg-light border border-secondary"
            >
              Iniciar sesión
            </Button>
            <div className="form-group mb-3">
              <div>
                <input
                  type="checkbox"
                  id="persist"
                  onClick={togglePersist}
                ></input>
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Recordarme en este dispositivo
                </label>
              </div>
            </div>
          </form>
        </Container>
        <Container className="py-3 register-form-container">
          <Form className="px-4">
            <h3 className="mt-5">Registro</h3>
            <p>
              Creando una cuenta en nuestra tienda, podrás hacer el proceso de
              compra más rápido, guardar multiples direcciones de envío, ver y
              trackear tus pedidos y más
            </p>
            <Button variant="primary" type="button" className="app-button">
              <Link to="/signup" className="link-button-text">
                Crear cuenta
              </Link>
            </Button>
          </Form>
        </Container>
      </Container>
    </>
  );
};

export default LoginPage;
