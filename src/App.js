import {Routes, Route} from "react-router-dom";

import Navbar from "./components/common/Navbar/Navbar";
import Home from './components/Pages/HomePage/Home'



function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home /> }/>
      </Routes>
    </div>
  );
}

export default App;
