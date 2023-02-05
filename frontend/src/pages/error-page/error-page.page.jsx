import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h1>Lo sentimos :-(</h1>
      <p>Ha ocurrido un error inesperado</p>
      <Link to="/">Regresa a la página principal</Link>
    </div>
  );
};

export default ErrorPage;
