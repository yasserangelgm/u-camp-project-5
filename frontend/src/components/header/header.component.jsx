import './header.styles.css';

/* import { Link, useNavigate } from 'react-router-dom'; */
/* import useLogout from '../../hooks/useLogout'; */
import Container from 'react-bootstrap/Container';
import NavBar from '../navbar/navbar.component';

export const Header = () => {
  /*  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate('/');
  }; */
  return (
    <>
      <Container className="container-fluid bg-warning mw-100">
        <Container className="container-sm">
          <Container className="fs-6 text-center text-uppercase py-2">
            <span>Venta de Enero 15% de descuento</span>
          </Container>
        </Container>
      </Container>
      <NavBar />
      {/* <header className="main-header">
        <nav>
          <ul className="navigation">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
            <li>
              <Link to="/admin/dashboard/">Admin</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <button onClick={signOut}>Cerrar sesión</button>
            </li>
          </ul>
        </nav>
      </header> */}
    </>
  );
};
