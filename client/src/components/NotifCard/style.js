import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Card = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  border-radius: 5px;
  height: 400px;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
  margin-top: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ab987a;
  }
`;

export const Header = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  height: 10%;
`;

export const Title = styled(Typography)`
  color: #000;
  font-weight: 700;
  font-size: 1.2rem;
`;
