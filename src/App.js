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

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((uid, token) => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes = (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />}></Route>
    </Routes>
  );


  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    );
  }

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{ isLoggedIn, login: login, logout: logout }}
      >
        <Router>
          <main>
            <Navigator />
            {routes}
          </main>
        </Router>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
