/*global FB*/

import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Form, Card, Container, Row, Col } from 'react-bootstrap'

import { AuthContext } from '../context/AuthContext'
import useFacebook from '../hooks/facebook-hook'
import { initializeFacebookSdk } from '../utils/fb-sdk'

import '../styles/login.css'

export default function Login({ location, history }) {
    initializeFacebookSdk()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [facebook] = useFacebook()
    const auth = useContext(AuthContext)
    const handleFacebookLogin = async () => {
        const response = await facebook.login()
        console.log(response)
        if (response.status && response.status == 'unknown') {
            window.alert('Failed to login. Please try again later')
        } else {
            auth.fbLogin(
                response.userID,
                response.name,
                response.email,
                response.accessToken,
                response.picture.data.url
            )
        }
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        auth.login(email, password)
    }

    return (
        <>
            <div className="login_form">
                <div className=" d-flex justify-content-center align-items-center">
                    <form className="Form_cardt pt-3" onSubmit={loginHandler}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="mt-2">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="btn btn-primary mt-3">Login</button>
                        <button
                            type="button"
                            className="login_btnfb btn w-100"
                            onClick={handleFacebookLogin}>
                            Login with Facebook
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
