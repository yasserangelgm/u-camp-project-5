import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>Lo sentimos :-(</h1>
      <p>Ha ocurrido un error inesperado</p>
      <p>
        <i>{error.status || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
