import Container from 'react-bootstrap/Container';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { signup, updateUser } from '../../context/actions/auth.actions';
import './register.styles.css';

const RegisterPage = ({ form: { onChange, form } }) => {
  const {
    authDispatch,
    authState: { auth },
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //TODO Validate inputs with REGEX? or library

    e.preventDefault();
    if (auth?.data?.user) {
      updateUser(form)(authDispatch);
      navigate('/profile', { replace: true });
    } else {
      signup(form)(authDispatch);
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      <Container className=" py-4">
        <h1 className="py-2 text-center">Tu cuenta</h1>
        <Container className="py-3 login-form-container">
          <form onSubmit={handleSubmit}>
            <h3>{'Crear cuenta'}</h3>
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
                value={form.name || auth?.data?.user.name || ''}
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
                value={form.lastname || auth?.data?.user.lastname || ''}
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
                value={form.email || auth?.data?.user.email || ''}
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
              {auth?.data?.user ? 'Guardar cambios' : 'Registrar'}
            </button>
          </form>
        </Container>
      </Container>
    </>
  );
};

export default RegisterPage;
