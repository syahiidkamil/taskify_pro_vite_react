import styled from "styled-components";

export const TaskListPageContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

export const TaskListTitle = styled.h1`
  color: #333;
  margin-bottom: 8px;
  text-align: center;
  font-size: 32px;
`;

export const TaskListSubtitle = styled.p`
  color: #555;
  text-align: center;
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 24px;
  font-style: italic;
`;

export const TaskListInputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const TaskListInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  box-sizing: border-box;
`;

export const AddTaskButton = styled.button`
  padding: 10px;
  background-color: #8e44ad;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #732d91;
  }
`;

export const TaskListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

export const softRed = "#ff8a80";
export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${softRed};
  cursor: pointer;
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
  display: block;
  width: 100%;

  &:hover {
    text-decoration: underline;
    color: darken(${softRed}, 10%);
  }
`;

export const FilterSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 10px;
  font-size: 16px;
`;

export const SortLabel = styled(FilterLabel)``;

export const FilterSelect = styled.select`
  margin-left: 5px;
`;

export const SortSelect = styled(FilterSelect)``;
