import styled from 'styled-components';
import { Typography, Avatar } from '@material-ui/core';

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.24);
  margin-bottom: ${({ mb }) => (mb ? '1rem' : '0')};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

export const Name = styled(Typography)`
  color: #000;
  font-weight: 700;
  font-size: 0.9rem;
  margin-left: 10px;
  cursor: pointer;
`;

export const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const Caption = styled(Typography)`
  color: #000;
  font-weight: 400;
  font-size: 0.8rem;
  margin: 0 1rem 1rem 1rem;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  height: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

export const CardActions = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
`;

export const Number = styled(Typography)`
  font-weight: 300;
  font-size: 15px;
  margin-left: 3px;
  &:hover {
    text-decoration: underline;
  }
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  color: #ab987a;
  cursor: pointer;
`;

export const Input = styled.input`
  border: none;
  color: #000;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 1.2rem 1rem 1.2rem 0;
  flex-grow: 2;

  &:focus {
    border: none;
    box-shadow: none;
    outline: none;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.11);
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  padding: 0 1rem;
`;

export const Time = styled(Typography)`
  color: rgba(0, 0, 0, 0.7);
  font-weight: 300;
  font-size: 12px;
  margin-left: 10px;
`;
