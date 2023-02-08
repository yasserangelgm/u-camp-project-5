import Container from 'react-bootstrap/Container';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { signup } from '../../context/actions/auth.actions';
import './register.styles.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ form: { onChange, form } }) => {
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const {
    authState: {
      auth: { user },
    },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate('/login', { replace: true });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    //TODO Validate inputs with REGEX? or library

    e.preventDefault();
    if (!currentUser) {
      signup(form)(authDispatch);
    } /* else {
      try {
        const response = await axiosPrivate.put(
          `/users/${currentUser.id}`,
          {
            id: currentUser.id,
            name: name === '' ? currentUser.name : name,
            lastname: lastName === '' ? currentUser.lastname : lastName,
            email: email === '' ? currentUser.email : email,
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        setCurrentUser(response.data);
      } catch (err) {
        if (!err?.response) {
          console.log('No hay respuesta del servidor');
        } else {
          console.log(err);
        }
      }
    } */
  };

  return (
    <>
      <Container className=" py-4">
        <h1 className="py-2 text-center">Tu cuenta</h1>
        <Container className="py-3 login-form-container">
          <form onSubmit={handleSubmit}>
            <h3>{!currentUser ? 'Crear cuenta' : 'Editar cuenta'}</h3>
            <div className="mb-3">
              {/* <Form.Label>Correo eléctronico</Form.Label> */}
              <input
                type="text"
                placeholder="Escriba su nombre"
                className="form-control shadow-none text-input "
                id="name"
                name="name"
                autoComplete="off"
                required
                onChange={onChange}
                value={form.name || ''}
              />
            </div>
            <div className="mb-3">
              {/* <Form.Label>Correo eléctronico</Form.Label> */}
              <input
                type="text"
                placeholder="Escriba su apellido"
                className="form-control shadow-none text-input "
                id="lastname"
                name="lastname"
                autoComplete="off"
                required
                onChange={onChange}
                value={form.lastname || ''}
              />
            </div>
            <div className="mb-3">
              {/* <Form.Label>Correo eléctronico</Form.Label> */}
              <input
                type="email"
                placeholder="Escriba su e-mail"
                className="form-control shadow-none text-input "
                id="email"
                name="email"
                autoComplete="off"
                required
                onChange={onChange}
                value={form.email || ''}
              />
            </div>

            <div className="mb-3">
              {/* <Form.Label>Contraseña</Form.Label> */}
              <input
                type="password"
                placeholder="Escriba una contraseña"
                className="form-control shadow-none text-input"
                id="password"
                name="password"
                autoComplete="off"
                required
                onChange={onChange}
                value={form.password || ''}
              />
            </div>
            <button
              variant="primary"
              type="submit"
              className="btn btn-primary app-button"
            >
              {!currentUser ? 'Registrar' : 'Guardar cambios'}
            </button>
          </form>
        </Container>
      </Container>
    </>
  );
};

export default RegisterPage;
