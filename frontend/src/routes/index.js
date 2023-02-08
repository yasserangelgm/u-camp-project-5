import LogoOut from '../components/logout';
import { HomePage } from '../pages/home/home.page';
import LoginPage from '../pages/login/login.page';
import RegisterPage from '../pages/register/register.page';
import { Unauthorized } from '../pages/unauthorized/unauthorized.page';
import UserProfile from '../pages/user-profile/user-profile.page';

export const publicRoutes = [
  /* { path: '/', element: HomePage, tittle: 'SU - Inicio' }, */
  { path: '/signup', element: RegisterPage, tittle: 'SU - Registro' },
  { path: '/login', element: LoginPage, tittle: 'SU - Iniciar sesión' },
  { path: '/profile', element: UserProfile, tittle: 'SU - Perfil' },
  { path: '/logout', element: LogoOut, tittle: 'SU - Cerrar sesión' },
  { path: '/contact', element: RegisterPage, tittle: 'SU - Contacto' },
  { path: '/products', element: RegisterPage, tittle: 'SU - Productos' },
  {
    path: '/products:productId',
    element: RegisterPage,
    tittle: 'SU - Detalle ',
  },
  { path: 'unauthorized', element: Unauthorized, tittle: 'SU - No autorizado' },
];
