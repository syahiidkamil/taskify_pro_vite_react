import styled from "styled-components";

export const RegisterContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: calc(100% - 40px);
  max-width: 400px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 20px 10px;
    width: calc(100% - 20px);
  }
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

export const LoginLink = styled.a`
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

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
