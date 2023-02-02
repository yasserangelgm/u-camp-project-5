import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
import axios from '../../api/axios';
import './register.styles.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/signup',
        {
          name: name,
          lastname: lastName,
          email: email,
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log('No hay respuesta del servisor');
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Container className=" py-4">
        <h1 className="py-2 text-center">Tu cuenta</h1>
        <Container className="py-3 login-form-container">
          <Form className="" onSubmit={handleSubmit}>
            <h3>Crear cuenta</h3>
            <Form.Group className="mb-3">
              {/* <Form.Label>Correo eléctronico</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Escriba su nombre"
                className="shadow-none text-input "
                id="name"
                autoComplete="off"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              {/* <Form.Label>Correo eléctronico</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Escriba su apellido"
                className="shadow-none text-input "
                id="lastname"
                autoComplete="off"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              {/* <Form.Label>Correo eléctronico</Form.Label> */}
              <Form.Control
                type="email"
                placeholder="Escriba su e-mail"
                className="shadow-none text-input "
                id="email"
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              {/* <Form.Label>Contraseña</Form.Label> */}
              <Form.Control
                type="password"
                placeholder="Escriba una contraseña"
                className="shadow-none text-input"
                id="password"
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="app-button">
              Registrar
            </Button>
          </Form>
        </Container>
      </Container>
    </>
  );
}

export default RegisterPage;
