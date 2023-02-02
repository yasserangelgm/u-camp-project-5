import './navbar.styles.css';
import BurguerButton from '../burguer-menu/burguer-button.component';
import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/NavLink';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
const NavBar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <Container className="container-fluid mw-100 px-0 py-2 nav-wrapper">
        <Container className="container-sm mw-100">
          <div className="nav-container px-2 open">
            <div className="nav-container-item logo-container">
              <LinkContainer to="/">
                <NavLink>
                  <img
                    src="../assets/logo-su.jpg"
                    alt="Logotipo SU: Casa de arte popular y diseño"
                    className="top-logo"
                  />
                  <span>Casa de arte popular y diseño</span>
                </NavLink>
              </LinkContainer>
            </div>
            <div className="nav-container-item p-2 menu-container">
              <div className={`links-container ${clicked ? 'active' : ''}`}>
                <LinkContainer to="/shop">
                  <NavLink
                    onClick={handleClick}
                    className={`link-item ${clicked ? 'py-5' : ''}`}
                  >
                    Compra ahora
                  </NavLink>
                </LinkContainer>
                <LinkContainer to="/catalog">
                  <NavLink
                    onClick={handleClick}
                    className={`link-item ${clicked ? 'py-5' : ''}`}
                  >
                    Catálogo
                  </NavLink>
                </LinkContainer>
                <LinkContainer to="/about">
                  <NavLink
                    onClick={handleClick}
                    className={`link-item ${clicked ? 'py-5' : ''}`}
                  >
                    Acerca de
                  </NavLink>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <NavLink
                    onClick={handleClick}
                    className={`link-item ${clicked ? 'py-5' : ''}`}
                  >
                    Contacto
                  </NavLink>
                </LinkContainer>
              </div>
              <div className="burguer-button-container">
                <BurguerButton
                  clicked={clicked}
                  handleClick={handleClick}
                ></BurguerButton>
              </div>
            </div>
            <div className="nav-container-item p-2 search-icon-container">
              <i className="bi bi-search"></i>
            </div>
            <div className="nav-container-item p-2 shop-icons-container">
              <LinkContainer to="/login">
                <NavLink>
                  <i className="bi bi-person-circle fs-5"></i>
                </NavLink>
              </LinkContainer>

              <i className="bi bi-cart-fill fs-5"></i>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default NavBar;
