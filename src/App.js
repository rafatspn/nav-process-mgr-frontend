/*global FB*/
import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Trends from "./pages/Trends";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Reports from "./pages/Reports";
import Summary from "./pages/Summary";
import Dashboard from "./pages/Dashboard";

import { AuthContext } from "./context/AuthContext";
import Navigator from "./components/Navigation/Navigator";
import loginData from "./data/login.json";

import "./App.css";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/summary" element={<Summary />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />}></Route>
      </Routes>
    );
  }

  const login = useCallback((userid) => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback((userid) => {
    setIsLoggedIn(false);
  }, []);
  return (
    <>
      <AuthContext.Provider
        value={{ isLoggedIn, login: login, logout: logout }}
      >
        <Router>
          <Navigator />
          {routes}
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
