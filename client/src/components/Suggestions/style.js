import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  margin-top: 1rem;
  min-height: 283px;
`;

export const Header = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  display: flex;
  align-items: center;
  padding: 1rem;
  height: 10%;
`;

export const Title = styled(Typography)`
  color: #000;
  font-weight: 700;
  font-size: 1.2rem;
`;

export const Body = styled.div`
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.11); */
`;

export const EmptyStateContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #ccc;
`;

export const EmptyStateTitle = styled(Typography)`
  font-weight: 700;
  font-size: 1rem;
`;
