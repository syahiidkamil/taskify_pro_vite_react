import styled from "styled-components";

export const TaskItem = styled.li`
  background: #f4f4f4;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

export const TaskCheckbox = styled.input`
  margin-right: 15px;
`;

export const TaskText = styled.span`
  flex-grow: 1;
`;

export const TaskActions = styled.div`
  display: flex;
  align-items: center;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;

  &:hover {
    color: #555;
  }

  svg {
    font-size: 20px;
  }
`;

export const DeleteButton = styled(IconButton)`
  color: #ff8a80;

  &:hover {
    color: darken(#ff8a80, 10%);
  }
`;
