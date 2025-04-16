import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';

const RegistrationPage = lazy(
  () => import('../pages/RegistrationPage/RegistrationPage'),
);
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const CalculatorPage = lazy(
  () => import('../pages/CalculatorPage/CalculatorPage'),
);
const DiaryPage = lazy(() => import('../pages/DiaryPage/DiaryPage'));

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  return isLoggedIn ? <Navigate to="/diary" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <MainPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/diary"
          element={
            <PrivateRoute>
              <DiaryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/calculator"
          element={
            <PrivateRoute>
              <CalculatorPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
