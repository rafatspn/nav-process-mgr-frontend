import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import loginData from "./data/login.json";

import "./App.css";

function App() {
  console.log(loginData);

  return (
    <>
      <Router>
        <Home />
      </Router>
    </>
  );
}

export default App;
