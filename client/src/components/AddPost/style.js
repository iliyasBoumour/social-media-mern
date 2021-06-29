import styled from 'styled-components';
import { Avatar, Divider, InputBase } from '@material-ui/core';

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  border-top: 5px solid #ab987a;
  margin-bottom: 1rem;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

export const Input = styled(InputBase)`
  width: 90%;
  padding: 1rem 0;
  color: #000;
  font-weight: 400;
  font-size: 1rem;
`;

export const StyledAvatar = styled(Avatar)`
  width: 35px;
  height: 35px;
  margin-right: 1rem;
`;

export const StyledDivider = styled(Divider)`
  width: 85%;
  margin-left: 10%;
`;

export const CardActions = styled.div`
  padding: 0.5rem 2rem 0.5rem 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ImageContainer = styled.div`
  width: 130px;
  height: 130px;
  margin: 1rem 0;
  border-radius: 6px;
`;

export const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 6px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 2;
`;
