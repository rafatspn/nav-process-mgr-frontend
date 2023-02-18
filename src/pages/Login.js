/*global FB*/

import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Form, Card, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { initializeFacebookSdk } from '../utils/fb-sdk'
import { NavLink } from 'react-router-dom'

import { faFacebook } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/AuthContext'
import useFacebook from '../hooks/facebook-hook'

import '../styles/login.css'

export default function Login({ location, history }) {
    const [expanded, setExpanded] = useState(false)
    const [expandedo, setExpandedo] = useState(true)
    const [expandedp, setExpandedp] = useState(false)
    const handleClick = () => {
        setExpanded(!expanded)
    }
    const handleClick1 = () => {
        setExpandedo(!expandedo)
    }
    const handleClick2 = () => {
        setExpandedp(!expandedp)
    }
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
            <section className="login_form ">
                <div className=" container">
                    <div className=" row justify-content-start align-items-center padding_custom">
                        <div className="   col-12 col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xll-5 align-items-center">
                            <h6 className="text-start mt-5">
                                Sign in with your Facebook Profile to start your
                                journey...Select your facebook pages while
                                Signing In.
                            </h6>
                        </div>{' '}
                    </div>
                    <div className=" row justify-content-start align-items-start pb-5">
                        <div className="  col-12 col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xll-5 align-items-center">
                            <div className=" d-flex justify-content-center align-items-center">
                                <button
                                    type="button"
                                    className="login_btnfb btn mt-4 mb-2"
                                    onClick={handleFacebookLogin}>
                                    <img
                                        src="/assets/facebook.svg"
                                        height="25px"
                                        className="facebook"
                                    />
                                    Login with Facebook
                                </button>
                            </div>
                            <div className=" d-flex justify-content-center align-items-center mt-2">
                                <h6>Or, Login using your email</h6>
                            </div>

                            <div className="accordion_box p-3 mt-4">
                                {/* <div className="card">
                                    <button
                                        className="btn w-100 login_btnbox "
                                        onClick={handleClick}>
                                        NEW HERE - SIGN UP
                                    </button>

                                    <form
                                        className="Form_cardt  "
                                        style={{
                                            height: expanded ? '210px' : '0px',
                                            transition: 'height 0.5s ease-out',
                                            overflow: 'hidden'
                                        }}>
                                        <label className="mt-2 ms-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form_control"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        <label className="mt-2 ms-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control form_control"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        <button className="login_btnlog btn mt-3 mb-2 w-100">
                                            Sign Up
                                        </button>
                                    </form>
                                </div> */}
                                <div className="card">
                                    <button
                                        className="btn w-100 login_btnbox "
                                        onClick={handleClick1}>
                                        LOG IN
                                    </button>

                                    <form
                                        className="Form_cardt  "
                                        style={{
                                            height: expandedo ? '210px' : '0px',
                                            transition: 'height 0.5s ease-out',
                                            overflow: 'hidden'
                                        }}
                                        onSubmit={loginHandler}>
                                        <label className="mt-2 ms-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            className="form-control form_control"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        <label className="mt-2 ms-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={password}
                                            className="form-control form_control"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        <button className="login_btnlog btn mt-3 mb-2 w-100">
                                            LOG IN
                                        </button>
                                    </form>
                                </div>
                                {/* <div className="card">
                                    <button
                                        className="btn w-100 login_btnbox "
                                        onClick={handleClick2}>
                                        FORGOT PASSWORD
                                    </button>

                                    <form
                                        className="Form_cardt "
                                        style={{
                                            height: expandedp ? '130px' : '0px',
                                            transition: 'height 0.5s ease-out',
                                            overflow: 'hidden'
                                        }}>
                                        <label className="mt-2 ms-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form_control"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />

                                        <button className="login_btnlog btn mt-3 mb-2 w-100">
                                            Next
                                        </button>
                                    </form>
                                </div> */}
                            </div>

                            <div className="mt-3 pb-5 text-center">
                                By Signing Up or Logging In I agree with the{' '}
                                <br></br>
                                <NavLink to="/terms">
                                    Terms and Conditions
                                </NavLink>
                                and{' '}
                                <NavLink to="/policy">Privacy Policy</NavLink>
                                <link rel="stylesheet" href="Shop.js" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
