import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate, useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';

const UserProfile = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Container className="container-fluid mw-100 h-100 py-4 ">
      <h3 className="text-center">Mi cuenta</h3>
      <p className="text-center">
        <Link to="/logout">Cerrar Sesión</Link>
      </p>
      <Container className="container-sm py-3 ">
        <h4>Historial de pedidos</h4>
        <h4>Detalles de la cuenta</h4>
        <p className="mb-0">{`${currentUser.name} ${currentUser.lastname}`}</p>
        <p className="mb-0">{`${currentUser.email}`}</p>

        <Button
          type="button"
          onClick={() =>
            navigate('/signup', { state: { from: location }, replace: true })
          }
        >
          Editar cuenta
        </Button>
      </Container>
    </Container>
  );
};

export default UserProfile;
