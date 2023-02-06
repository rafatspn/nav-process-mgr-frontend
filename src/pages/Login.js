/*global FB*/

import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Form, Card, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFacebook } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/AuthContext'
import useFacebook from '../hooks/facebook-hook'

import '../styles/login.css'

export default function Login({ location, history }) {
    //initializeFacebookSdk()
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
        console.log('kanta')
        e.preventDefault()
        auth.login(email, password)
    }
    // for accordion
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)

    return (
        <>
            <section className="login_form ">
                <div className=" container">
                    <div className=" row justify-content-center align-items-center">
                        <div className="   col-12 col-sm-10 col-md-8 col-lg-9 col-xl-9 col-xll-9 align-items-center">
                            <h6 className="text-center mt-5">
                                Sign in with your Facebook Profile to start your
                                journey...Select your facebook pages while
                                Signing In.
                            </h6>
                        </div>{' '}
                    </div>
                    <div className=" row justify-content-center align-items-center pb-5">
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
                                <div className="card">
                                    <button
                                        className="btn w-100 login_btnbox "
                                        onClick={() => setIsOpen(!isOpen)}>
                                        NEW HERE - SIGN UP
                                    </button>
                                    {isOpen && (
                                        <form className="Form_cardt pt-3 ">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control form_control"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                            <label className="mt-3">
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
                                            <button className="login_btnlog btn mt-5 w-100">
                                                Sign Up
                                            </button>
                                        </form>
                                    )}
                                </div>
                                <div className="card">
                                    <button
                                        className="btn w-100 login_btnbox "
                                        onClick={() => setIsOpen1(!isOpen1)}>
                                        LOG IN
                                    </button>
                                    {isOpen1 && (
                                        <form
                                            className="Form_cardt pt-3 "
                                            onSubmit={loginHandler}>
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                className="form-control form_control"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                            <label className="mt-3">
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
                                            <button className="login_btnlog btn mt-5 w-100">
                                                LOG IN
                                            </button>
                                        </form>
                                    )}
                                </div>
                                <div className="card">
                                    <button
                                        className="btn w-100 login_btnbox "
                                        onClick={() => setIsOpen2(!isOpen2)}>
                                        FORGOT PASSWORD
                                    </button>
                                    {isOpen2 && (
                                        <form className="Form_cardt pt-3">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control form_control"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />

                                            <button className="login_btnlog btn mt-5 w-100">
                                                Next
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                            <div
                                className="mt-3 pb-5 text-center
                        ">
                                By Signing Up or Logging In I agree with the{' '}
                                <br></br>
                                <a href="#">Terms and Conditions</a>
                                and <a href="#">Privacy Policy</a>
                                <link rel="stylesheet" href="Shop.js" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
