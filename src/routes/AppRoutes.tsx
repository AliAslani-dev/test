import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const PublicRoute = lazy(() => import("./PublicRoute"));
const Loader = lazy(() => import("./PublicRoute"));

// pages
const LogIn = lazy(() => import("@/pages/auth/login"));
const Dashboard = lazy(() => import("@/pages/main/Dashboard"));
const AllPosts = lazy(() => import("@/pages/main/post/AllPosts"));
const Post = lazy(() => import("@/pages/main/post/Post"));
// layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
// const HomePage = lazy(() => import("@/pages/home/HomePage"));

const withSuspense = (
  children: React.ReactNode,
  fallback: React.ReactNode = <Loader>{null}</Loader>
) => <Suspense fallback={fallback}>{children}</Suspense>;

export default function AppRoutes() {
  return (
    <Routes>
      {/* start Auth Routes */}
      <Route
        path="/auth"
        element={withSuspense(
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        )}
      >
        <Route path="login" element={<LogIn />} />
      </Route>

      {/*end Auth Routes */}

      {/* start dashboard */}
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
      {/* end dashboard */}

      {/* start posts */}
      <Route
        path="/posts"
        element={withSuspense(
          <PublicRoute>
            <MainLayout />
          </PublicRoute>
        )}
      >
        <Route index element={<AllPosts />} />
        <Route path=":id" element={<Post />} />
      </Route>
      {/* end posts */}

      {/* <Route
        path="/profile"
        element={withSuspense(
          <PublicRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </PublicRoute>
        )}
      /> */}

      {/* Catch-all fallback */}
      {/* <Route
        path="*"
        element={withSuspense(
          <PublicRoute>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </PublicRoute>
        )}
      /> */}
    </Routes>
  );
}
