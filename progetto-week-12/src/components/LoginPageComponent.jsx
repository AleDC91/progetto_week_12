import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { baseURL } from "../config";
import ErrorComponent from "./ErrorComponent";
import { useNavigate } from "react-router-dom";


export default function LoginPageComponent({handleLogin}) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });


const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");



  const handleSubmit = (e) => {
    setErrorMsg("");
    e.preventDefault();
    getToken();
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
  };

  const getToken = () => {
    axios
      .post("http://localhost/wp-json/jwt-auth/v1/token", userData)
      .then((res) => {
        const token = res.data.token;
        handleLogin(token);
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.message);
        console.error("Errore durante la richiesta del token:", error);
      });
  };

  return (
    <main className="container mt-5">
      <h1>Login</h1>
      {errorMsg && <ErrorComponent errorMsg={errorMsg} />}
      <Form className="my-5" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Control
            name="username"
            type="text"
            placeholder="username..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="password"
            type="password"
            placeholder="password..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Login
        </Button>
      </Form>
    </main>
  );
}
