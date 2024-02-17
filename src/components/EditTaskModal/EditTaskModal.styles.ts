import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 0.5em;
`;

export const ModalInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

export const ModalTextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  height: 100px;
`;

export const ModalSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

export const ModalCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1em;
`;

export const ModalLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.5em;
`;

export const ModalButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  margin-top: 15px;
  transition: background-color 0.2s, color 0.2s;

  &:first-of-type {
    background-color: #3498db;
    color: white;
  }

  &:last-of-type {
    background-color: transparent;
    color: #555;
    border: 1px solid #ccc;
  }

  &:hover {
    background-color: #2980b9;
    color: white;
    border-color: transparent;
  }
`;
