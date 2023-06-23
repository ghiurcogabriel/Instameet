import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { authUser } from "./components/firebase/config";

import Navbar from "./components/common/Navbar/Navbar";
import Home from "./components/Pages/HomePage/Home";
import LandingPage from "./components/Pages/LandingPage/LandingPage";
import UserHomepage from "./components/Pages/UserHomepage/UserHomepage";

function App() {
  const [user] = useAuthState(authUser);
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Home />}
        />
        <Route
          path="/"
          element={!user ? <Navigate to="/login" /> : <LandingPage />}
        />
        {user && (
          <Route path='/userHomepage' element={<UserHomepage />}/>
        )}
      </Routes>
    </div>
  );
}

export default App;
