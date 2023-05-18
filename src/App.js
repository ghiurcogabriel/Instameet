import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { authUser } from "./components/firebase/config";

import Navbar from "./components/common/Navbar/Navbar";
import Home from "./components/Pages/HomePage/Home";
import LandingPage from "./components/Pages/LandingPage/LandingPage";

function App() {
  const [user] = useAuthState(authUser);
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Navigate to="/landingPage" /> : <Home />}
        />
        <Route
          path="/landingPage"
          element={!user ? <Navigate to="/" /> : <LandingPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
