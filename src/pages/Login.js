/*global FB*/

import React, { useState, useContext, useCallback, useEffect } from "react";
import { Form, Card, Container, Row, Col } from "react-bootstrap";

import { AuthContext } from "../context/AuthContext";
import useFacebook from "../hooks/facebook-hook";

import "../styles/login.css";

export default function Login({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [facebook, isFacebookReady] = useFacebook();

  const auth = useContext(AuthContext);

  const handleFacebookLogin = async () => {
    const response = await facebook.login();
    console.log(response);
    auth.login();
  };

  return (
    <>
      <div className="login_form">
        <div className=" d-flex justify-content-center align-items-center ">
          <form className="Form_cardt ">
            <div className="card card_float mb-4">Sign In </div>
            <div className="mb-3">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className=" form-control"
                  id="exampleInputEmail1"
                  aria-label="Username"
                  aria-describedby="emailHelp"
                  placeholder="Email Address"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="input-group mb-3">
                <input
                  id="exampleInputPassword1"
                  type="password"
                  className=" form-control"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div class="mb-4 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Remember Me
              </label>
            </div>
            <button type="submit" className="login_btn mb-2 btn w-100">
              SIGN IN
            </button>

            <button
              type="submit"
              className="login_btnfb btn w-100"
              onClick={handleFacebookLogin}
              disabled={!isFacebookReady}
            >
              Login with Facebook
            </button>
            <div className="login_bottam1 d-flex justify-content-center mt-3">
              <span className="pe-2">Don't have an account?</span>
              {/* <Link href="#" className="a">
                            Sign Up
                        </Link> */}
            </div>
          </form>
        </div>
      </div>
      {/* <button
        type="button"
        onClick={handleFacebookLogin}
        disabled={!isFacebookReady}
      >
        Login with Facebook
      </button> */}
    </>
  );
}
