import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/admin/dashboard/"
              >
                <span data-feather="home"></span>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/">
                <span data-feather="file"></span>
                Pedidos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/products">
                <span data-feather="shopping-cart"></span>
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/">
                <span data-feather="users"></span>
                Categorías
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/">
                <span data-feather="bar-chart-2"></span>
                Usuarios
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
