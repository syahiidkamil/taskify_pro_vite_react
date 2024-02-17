import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { axiosInstance } from "../../api/axiosInstance";
import useAuth from "../../hooks/useAuth";
import { LOGIN_URL } from "../../constants/api.constants";
import {
  LoginContainer,
  Title,
  ErrorMessage,
  FormGroup,
  Label,
  FormControl,
  Button,
  RegisterLink,
} from "./Login.styles";

const Login: React.FC = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(LOGIN_URL, {
        email,
        password: pwd,
      });
      const { access_token, refresh_token } = response.data;
      setAuth(access_token, refresh_token);
      setEmail("");
      setPwd("");
      navigate("/tasklist", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LoginContainer>
      <Title>Login to Your Account</Title>
      {errMsg && <ErrorMessage ref={errRef}>{errMsg}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <FormControl
            autoComplete="on"
            type="email"
            id="email"
            placeholder="Enter your email"
            ref={userRef}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <FormControl
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </FormGroup>
        <Button type="submit">Sign In</Button>
      </form>
      <RegisterLink as={Link} to="/register">
        Don't have an account? Register
      </RegisterLink>
    </LoginContainer>
  );
};

export default Login;
