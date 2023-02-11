/*global FB*/
import React, { useState, useCallback, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'
import Trends from './pages/Trends'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Reports from './pages/Reports'
import Summary from './pages/Summary'
import Dashboard from './pages/Dashboard'

import { AuthContext } from './context/AuthContext'
import Navigator from './components/Navigation/Navigator'
import loginData from './data/login.json'
import config from './config/config.json'

import './App.css'

function App() {
    let [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [])
    let routes

    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/trends" element={<Trends />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/myBusiness" element={<Reports />} />
                <Route path="*" element={<Navigate to="/" />}></Route>
            </Routes>
        )
    } else {
        routes = (
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />}></Route>
            </Routes>
        )
    }

    const fbLogin = useCallback(
        async (userId, userName, email, accessToken, profilePicture) => {
            const configData = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            try {
                //let access_token = await FB.getAuthResponse()['accessToken']

                const { data } = await axios.post(
                    `${config.url}/api/users/fbLogin`,
                    {
                        userId,
                        userName,
                        accessToken,
                        email,
                        profilePicture
                    },
                    configData
                )
                localStorage.setItem('user', JSON.stringify(data))
                console.log(data)
                setIsLoggedIn(true)
            } catch (e) {
                console.log(e)
                alert('Login Failed')
            }
        },
        []
    )

    const login = useCallback(async (email, password) => {
        console.log('email.pass', email, password)
        const configData = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.post(
                `${config.url}/api/users/login`,
                { email, password },
                configData
            )
            localStorage.setItem('user', JSON.stringify(data))
            setIsLoggedIn(true)
        } catch (e) {
            alert('Invalid Credentials')
            // setIsLoggedIn(true)
        }
    }, [])
    const logout = useCallback((userid) => {
        localStorage.removeItem('user')
        setIsLoggedIn(false)
    }, [])
    return (
        <>
            <AuthContext.Provider
                value={{
                    isLoggedIn,
                    login: login,
                    fbLogin: fbLogin,
                    logout: logout
                }}>
                <Router>
                    <Navigator />
                    {routes}
                </Router>
            </AuthContext.Provider>
        </>
    )
}

export default App
