import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AddHotel from "./pages/AddHotel";
import Hero from "./components/Hero";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAppContext } from "./context/AppContext";
import Myhotels from "./pages/Myhotels";
import EditHotels from "./pages/EditHotels";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, loading } = useAppContext();
  if (loading) {
    return (
      <>
        <p className="text-primary animate-pulse">Loading...</p>
      </>
    );
  }
  return isLoggedIn ? children : <Navigate to={"/login"} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Hero />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        <Route
          path="/add-hotel"
          element={
            <Layout>
              <ProtectedRoute>
                <AddHotel />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/my-hotels"
          element={
            <Layout>
              <ProtectedRoute>
                <Myhotels />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/edit-hotel/:hotelId"
          element={
            <Layout>
              <ProtectedRoute>
                <EditHotels />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/hotel/:hotelId/booking"
          element={
            <Layout>
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <Layout>
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Details />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
export default App;
