import { createTheme, MantineProvider } from "@mantine/core";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'
import '@mantine/carousel/styles.css'
import ErrorPage from "./components/common/ErrorPage";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./components/layout/MainLayout";
import SignupPage from "./pages/SignUpPage";
import AdminLayout from "./components/layout/AdminLayout";
import AuthProtectedRoute from "./utils/protection/AuthProtectedRoute";
import AdminOverview from "./components/admin/Overview";
import UserManagement from "./components/admin/UserManagement";
import VehicleManagement from "./components/admin/VehicleManagement";
import VehiclesPage from "./pages/VehiclesPage";
import VehicleDetails from "./pages/VehicleDetailsPage";
import BookingManagement from "./components/admin/BookingManagement";
import UserLayout from "./components/layout/UserLayout";
import Overview from "./components/user/Overview";
import Profile from "./components/user/Profile.user";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "car-listing", element: <VehiclesPage/>}, 
      { path: "car-listing/:id", element: <VehicleDetails/>},
    ],
  },
  { path: "register", element: <SignupPage /> },
  {
    path: '/user-dashboard',
    element: <AuthProtectedRoute>
      <UserLayout/>
    </AuthProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Overview /> },
      { path: "profile", element: <Profile /> }, 
    ]
  },
  {
    path: '/admin-dashboard',
    element: <AuthProtectedRoute>
      <AdminLayout />
    </AuthProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <UserManagement /> },
      { path: 'users', element: <UserManagement /> },
      { path: 'vehicles', element: <VehicleManagement /> },
      { path: 'bookings', element: <BookingManagement />}
    ]
  },
])

const theme = createTheme({
  fontFamily: "Saira, sans-serif",
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
});

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App;
