import styled from 'styled-components';

export const SearchContainer = styled.div`
  width: 18rem;
  margin-left: 1rem;
  margin-right: 1rem;
  height: 55%;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  align-items: center;
  color: #0f1626;
  padding: 1rem 0.5rem;
`;

export const SearchInput = styled.input`
  border: none;
  flex-grow: 2;
  outline: none;
  height: 100%;
  border-radius: 8px;
  width: 100%;
  color: #0f1626;
  font-size: 0.9rem;
  padding: 1rem 0.5rem;
  &::focus {
    border: none;
    outline: none;
  }
`;
