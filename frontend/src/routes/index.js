import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/error-page/error-page.page';
import RegisterPage from '../pages/register/register.page';
import LoginPage from '../pages/login/login.page';
import Root from '../components/root/root.component';
import RootAdmin from '../components/root-admin/root-admin.component';
import { HomePage } from '../pages/home/home.page';
import RequireAuth from '../components/require-auth';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/signup',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/contact',
        element: <LoginPage />,
      },
      {
        path: '/products',
        element: <LoginPage />,
      },
      {
        path: '/products/:productId',
        element: <LoginPage />,
      },
    ],
  },

  {
    element: <RequireAuth />,
    children: [
      {
        path: '/admin/dashboard/',
        element: <RootAdmin />,
        children: [
          {
            index: true,
            element: <div>Root Admin</div>,
          },
          {
            path: '/admin/dashboard/products',
            element: <LoginPage />,
          },
          {
            path: '/admin/dashboard/users',
            element: <LoginPage />,
          },
          {
            path: '/admin/dashboard/categories',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
