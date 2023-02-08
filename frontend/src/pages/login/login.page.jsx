import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { signin } from "../../context/actions/auth.actions";
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./login.styles.css";

const LoginPage = ({ form: { onChange, form } }) => {
  const { authState, authDispatch, persist, setPersist } = useAuth();
  const { setCurrentUser } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    signin(form)(authDispatch);
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
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
                name="email"
                type="email"
                placeholder="Escriba su e-mail"
                className="form-control"
                onChange={onChange}
                value={form.email || ""}
              />
              <Form.Text className="text-muted">
                Nunca compartiremos tu correo con nadie más.
              </Form.Text>
            </div>

            <div className="form-group mb-3">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Escriba su contraseña"
                className="form-control shadow-none text-input"
                onChange={onChange}
                value={form.password || ""}
              />
            </div>

            <button
              variant="ligth"
              type="submit"
              className="btn btn-primary app-button"
            >
              Iniciar sesión
            </button>
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
