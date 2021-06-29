import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const SearchContainer = styled.div`
  width: 16rem;
  margin-left: 1rem;
  height: 60%;
  border-radius: 100px;
  border: 1px solid #ab987a;
  display: flex;
  align-items: center;
  color: #ab987a;
  padding: 1rem 0.5rem;
`;

export const SearchInput = styled.input`
  border: none;
  flex-grow: 2;
  outline: none;
  height: 100%;
  border-radius: 100px;
  width: 100%;
  color: #ab987a;
  font-size: 0.9rem;
  padding: 1rem 0.5rem;
  &::focus {
    border: none;
    outline: none;
  }
`;

export const Item = styled.div`
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.11);
  padding: 0.5rem;
  width: 100%;
  width: 90%;
`;

export const EmptyStateContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #ccc;
`;

export const EmptyStateTitle = styled(Typography)`
  font-weight: 700;
  font-size: 1.5rem;
`;
