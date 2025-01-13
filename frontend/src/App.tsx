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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
export default App;
