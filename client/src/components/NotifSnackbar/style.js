import styled from 'styled-components';
import { Typography, Avatar } from '@material-ui/core';

export const Div = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  border-radius: 7px;
  background-color: #fff;
`;

export const Header = styled.div`
  padding: 0.8rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled(Typography)`
  color: #000;
  font-weight: 700;
  font-size: 1rem;
`;

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled(Typography)`
  color: #000;
  font-weight: 700;
  font-size: 0.9rem;
  margin-left: 10px;
`;

export const Action = styled(Typography)`
  color: #000;
  font-weight: 400;
  font-size: 0.8rem;
  margin-left: 10px;
`;

export const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`;
