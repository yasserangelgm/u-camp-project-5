import './App.css';
import ErrorPage from './pages/error-page/error-page.page';
import RegisterPage from './pages/register/register.page';
import LoginPage from './pages/login/login.page';
import Root from './components/root-user/root.component';
import RootAdmin from './components/root-admin/root-admin.component';
import { HomePage } from './pages/home/home.page';
import RequireAuth from './components/require-auth';
import { Unauthorized } from './pages/unauthorized/unauthorized.page';
import AdminHomePage from './pages/admin/home/admin-home.page';
import Users from './components/user/users.component';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserProfile from './pages/user-profile/user-profile.page';
import LogoOut from './components/logout';
import AdminProducts from './pages/admin/products/admin-products.page';

function App() {
  return (
    /* Public routes */
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/signup" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/logout" element={<LogoOut />}></Route>
          <Route path="/contact" element={<RegisterPage />}></Route>
          <Route path="/products" element={<RegisterPage />}></Route>
          <Route path="/products:productId" element={<RegisterPage />}></Route>
          <Route path="unauthorized" element={<Unauthorized />}></Route>
        </Route>

        {/* Protected routes */}

        <Route element={<RequireAuth />}>
          <Route
            path="/admin/dashboard"
            element={<RootAdmin />}
            errorElement={<ErrorPage />}
          >
            <Route index element={<AdminHomePage />}></Route>
            <Route
              path="/admin/dashboard/products"
              element={<AdminProducts />}
            ></Route>
            <Route
              path="/admin/dashboard/categories"
              element={<LoginPage />}
            ></Route>
            <Route path="/admin/dashboard/users" element={<Users />}></Route>
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
