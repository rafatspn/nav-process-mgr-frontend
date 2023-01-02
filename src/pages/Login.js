/*global FB*/

import React, { useState, useContext, useCallback, useEffect } from "react";
import { Form, Card, Container, Row, Col } from "react-bootstrap";

import { AuthContext } from "../context/AuthContext";
import useFacebook from "../hooks/facebook-hook";

export default function Login({ location, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [facebook, isFacebookReady] = useFacebook();
  const auth = useContext(AuthContext);
  const handleFacebookLogin = async () => {
    const response = await facebook.login();
    console.log(response);
    auth.login()
  };

  return (
    <>
      <button
        type="button"
        onClick={handleFacebookLogin}
        disabled={!isFacebookReady}
      >
        Login with Facebook
      </button>
    </>
  );
}
