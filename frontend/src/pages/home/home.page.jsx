import './home.styles.css';
import { Container } from 'react-bootstrap';
import useUser from '../../hooks/useUser';

export const HomePage = () => {
  return (
    <main>
      <Container className="container-fluid  hero mw-100">
        <Container className="container-fluid h-100 mw-100 hero-image">
          <Container className="container-sm h-100">
            <div className="hero-text abs-center">
              <h1 className="text-light text-center">
                Siente el arte y la tradición
              </h1>
            </div>
          </Container>
        </Container>
      </Container>
    </main>
  );
};
