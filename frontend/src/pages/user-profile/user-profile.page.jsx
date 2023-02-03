import { Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  return (
    <Container className="py-4">
      <h3 className="text-center">Mi cuenta</h3>
      <p className="text-center">
        <Link to="/logout">Cerrar Sesión</Link>
      </p>
    </Container>
  );
};

export default UserProfile;
