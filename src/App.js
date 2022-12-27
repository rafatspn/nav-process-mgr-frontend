import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Trends from './pages/Trends'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Reports from './pages/Reports'
import Summary from './pages/Summary'
import Dashboard from './pages/Dashboard'

import Navigator from './components/Navigation/Navigator'
import loginData from './data/login.json'

import './App.css'

function App() {
    console.log(loginData)
    let routes = (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )

    return (
        <>
            <Router>
                <Navigator />
                {routes}
            </Router>
        </>
    )
}

export default App
