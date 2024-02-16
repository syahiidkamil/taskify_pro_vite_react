import React from "react";
import {
  Body,
  LoginContainer,
  Title,
  FormGroup,
  Label,
  FormControl,
  Button,
  RegisterLink,
} from "./Login.styles";

const Login: React.FC = () => {
  return (
    <Body>
      <LoginContainer>
        <Title>Login to Your Account</Title>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <FormControl type="email" id="email" placeholder="Enter your email" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <FormControl
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </FormGroup>
        <Button>Login</Button>
        <RegisterLink href="#">Don't have an account? Register</RegisterLink>
      </LoginContainer>
    </Body>
  );
};

export default Login;
