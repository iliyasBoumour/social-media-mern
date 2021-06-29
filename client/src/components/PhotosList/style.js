import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Body = styled.div`
  padding: 2rem;
  height: 75vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ab987a;
  }
`;

export const ImageContainer = styled.div`
  height: 240px;
  width: 100%;
  margin: 0.5rem;
  cursor: pointer;
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
`;

export const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 6px;
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
