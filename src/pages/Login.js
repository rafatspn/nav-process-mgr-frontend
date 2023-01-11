/*global FB*/

import React, { useState, useContext, useCallback, useEffect } from "react";
import { Form, Card, Container, Row, Col } from "react-bootstrap";

import { AuthContext } from "../context/AuthContext";
import useFacebook from "../hooks/facebook-hook";
import { initializeFacebookSdk } from "../utils/fb-sdk";

import "../styles/login.css";

export default function Login({ location, history }) {
  initializeFacebookSdk()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [facebook] = useFacebook();
  const auth = useContext(AuthContext);
  const handleFacebookLogin = async () => {
    const response = await facebook.login();
    console.log(response);
    if (response.status && response.status == "unknown") {
      window.alert("Failed to login. Please try again later");
    } else {
      auth.login();
    }
  };

  return (
    <>
      <div className="login_form">
        <div className=" d-flex justify-content-center align-items-center ">
          <form className="Form_cardt ">
            <button
              type="button"
              className="login_btnfb btn w-100"
              onClick={handleFacebookLogin}
            >
              Login with Facebook
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
