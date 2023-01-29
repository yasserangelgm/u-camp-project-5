import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import ErrorPage from '../pages/error-page/error-page.page';
import RegisterPage from '../pages/register/register.page';
import LoginPage from '../pages/login/login.page';
import Root from '../components/root/root.component';
import RootAdmin from '../components/root-admin/root-admin.component';
import { HomePage } from '../pages/home/home.page';
import RequireAuth from '../components/require-auth';
import { Unauthorized } from '../pages/unauthorized/unauthorized.page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/signup" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/contact" element={<RegisterPage />}></Route>
        <Route path="/products" element={<RegisterPage />}></Route>
        <Route path="/products:productId" element={<RegisterPage />}></Route>
        <Route path="unauthorized" element={<Unauthorized />}></Route>
      </Route>
      <Route element={<RequireAuth />}>
        <Route
          path="/admin/dashboard"
          element={<RootAdmin />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<HomePage />}></Route>
          <Route
            path="/admin/dashboard/products"
            element={<RegisterPage />}
          ></Route>
          <Route
            path="/admin/dashboard/categories"
            element={<LoginPage />}
          ></Route>
          <Route
            path="/admin/dashboard/users"
            element={<RegisterPage />}
          ></Route>
        </Route>
      </Route>
    </>
  )
);

export default router;
