import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navigator from "./components/Navigation/Navigator";
import loginData from "./data/login.json";

import "./App.css";

function App() {
  console.log(loginData);

  return (
    <>
      <Router>
        <Navigator />
      </Router>
    </>
  );
}

export default App;
