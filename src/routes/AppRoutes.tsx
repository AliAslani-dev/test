import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const PublicRoute = lazy(() => import("./PublicRoute"));
const Loader = lazy(() => import("../components/shared/Loader"));

// pages
const LogIn = lazy(() => import("@/pages/auth/login"));
const Signup = lazy(() => import("@/pages/auth/SignUp"));
const Dashboard = lazy(() => import("@/pages/main/Dashboard"));
const Products = lazy(() => import("@/pages/main/post/AllPosts"));
// layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));

const withSuspense = (
  children: React.ReactNode,
  fallback: React.ReactNode = <Loader>{null}</Loader>
) => <Suspense fallback={fallback}>{children}</Suspense>;

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect to login */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* Auth Routes */}
      <Route
        path="/auth"
        element={withSuspense(
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        )}
      >
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={withSuspense(
          <PublicRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PublicRoute>
        )}
      />


      <Route
        path="/products"
        element={withSuspense(
          <PublicRoute>
            <MainLayout>
              <Products />
            </MainLayout>
          </PublicRoute>
        )}
      />

          <Route
        path="/orders"
        element={withSuspense(
          <PublicRoute>
            <MainLayout>
              <Products />
            </MainLayout>
          </PublicRoute>
        )}
      />

      {/* Optional catch-all redirect */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}
