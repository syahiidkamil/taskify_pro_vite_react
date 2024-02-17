import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";

import {
  RegisterContainer,
  Title,
  ErrorMessage,
  FormGroup,
  Label,
  FormControl,
  Button,
  LoginLink,
} from "./Register.styles";
import { REGISTER_URL } from "../../constants/api.constants";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(REGISTER_URL, {
        name,
        email,
        password: pwd,
      });
      if (response.data) {
        alert("Registration successful!");
        navigate("/login", { replace: true });
      } else {
        alert("Something was wrong please try again");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response.status === 409) {
        setErrMsg("Email already in use");
      } else if (err.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <RegisterContainer>
      <Title>Register Your Account</Title>
      {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <FormControl
            type="text"
            id="name"
            placeholder="Enter your name"
            ref={nameRef}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <FormControl
            type="email"
            id="email"
            placeholder="Enter your email"
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
            placeholder="Create a password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </FormGroup>
        <Button type="submit">Register</Button>
      </form>
      <LoginLink as={Link} to="/login">
        Already have an account? Log in
      </LoginLink>
    </RegisterContainer>
  );
};

export default Register;
