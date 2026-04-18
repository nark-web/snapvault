import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const FoldersPage = lazy(() => import("./pages/FoldersPage"));
const FolderDetailPage = lazy(() => import("./pages/FolderDetailPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ClientAccessPage = lazy(() => import("./pages/ClientAccessPage"));
const ClientDownloadPage = lazy(() => import("./pages/ClientDownloadPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));

function PageLoader() {
  return (
    <div className="flex-1 p-8 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

// Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const foldersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/folders",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FoldersPage />
    </Suspense>
  ),
});

const folderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/folders/$folderId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FolderDetailPage />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SettingsPage />
    </Suspense>
  ),
});

const clientAccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/access/$code",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ClientAccessPage />
    </Suspense>
  ),
});

const clientDownloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/download/$folderId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ClientDownloadPage />
    </Suspense>
  ),
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment/success",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PaymentSuccessPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  foldersRoute,
  folderDetailRoute,
  profileRoute,
  settingsRoute,
  clientAccessRoute,
  clientDownloadRoute,
  paymentSuccessRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
