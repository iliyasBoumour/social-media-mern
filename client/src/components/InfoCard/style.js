import styled from 'styled-components';
import { Typography, Button as Btn } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  padding: 0.7rem;
  &:last-child {
    border: none;
  }
`;

export const Header = styled.div`
  background: #ab987a;
  height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: calc(40px - 0.6rem);
`;

export const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  border: 3px solid #fff;
  margin-top: 40px;
`;

export const Bold = styled(Typography)`
  color: #000;
  font-weight: 700;
  font-size: 0.9rem;
`;

export const Light = styled(Typography)`
  color: rgba(0, 0, 0, 0.47);
  font-weight: 400;
  font-size: 0.8rem;
`;

export const Button = styled(Btn)`
  color: #ab987a;
  font-weight: 700;
  font-size: 0.7rem;
  &:hover {
    color: #ab987a;
  }
`;
