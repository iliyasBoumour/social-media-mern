import styled from 'styled-components';
import { Typography, Button as Btn } from '@material-ui/core';

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  margin-top: 0.5rem;
  min-height: 353px;
`;

export const Header = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  height: 10%;
`;

export const Title = styled(Typography)`
  color: #000;
  font-weight: 700;
  font-size: 1.2rem;
`;

export const Button = styled(Btn)`
  color: #ab987a;
  font-weight: 700;
  font-size: 0.7rem;
  &:hover {
    color: #ab987a;
  }
`;

export const Body = styled.div`
  padding: 0.5rem;
`;

export const ImageContainer = styled.div`
  /* height: 100px; */
  margin: 0.5rem;
`;

export const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
`;

export const EmptyStateContainer = styled.div`
  width: 100%;
  height: 250px;
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
