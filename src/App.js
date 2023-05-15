import {Routes, Route} from "react-router-dom";

import Navbar from "./components/common/Navbar/Navbar";
import Home from './components/Pages/HomePage/Home'
import LandingPage from "./components/Pages/LandingPage/LandingPage";



function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home /> }/>
        <Route path="/landingPage" element={<LandingPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
