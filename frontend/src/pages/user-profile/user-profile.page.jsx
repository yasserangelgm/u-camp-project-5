import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../context/actions/auth.actions';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UserProfile = () => {
  const {
    authDispatch,
    authState: {
      auth: { data },
    },
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout()(authDispatch);
    navigate('/', { replace: true });
  };
  return (
    <Container className="container-fluid mw-100 h-100 py-4 ">
      <h3 className="text-center">Mi cuenta</h3>
      <p className="text-center">
        <button
          type="button"
          className="btn btn-link text-center"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </p>

      <Container className="container-sm py-3 ">
        <h4>Historial de pedidos</h4>
        <h4>Detalles de la cuenta</h4>
        <p className="mb-0">{`${data?.user.name} ${data?.user.lastname}`}</p>
        <p className="mb-0">{`${data?.user.email}`}</p>

        <Button
          type="button"
          onClick={() =>
            navigate('/signup', { state: { from: location }, replace: true })
          }
        >
          Editar cuenta
        </Button>
        <Container className="pt-5 px-0">
          {data?.user.role === 1 && (
            <Link to="/admin/dashboard">Panel de administrador</Link>
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default UserProfile;
