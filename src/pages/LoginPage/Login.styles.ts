import styled from "styled-components";

export const Body = styled.div`
  font-family: Arial, sans-serif;
  background: linear-gradient(160deg, #a1ffce, #faffd1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  padding: 20px;
`;

export const LoginContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 24px;
  text-align: center;
  font-size: 24px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 5px;
  font-size: 16px;
  width: 100%;
`;

export const FormControl = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #ff758c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  box-sizing: border-box;

  &:hover {
    background-color: #ff527b;
  }
`;

export const RegisterLink = styled.a`
  text-align: center;
  display: block;
  margin-top: 20px;
  color: #333;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;
