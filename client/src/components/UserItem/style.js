import styled from 'styled-components';
import { Typography, Button as Btn, Avatar } from '@material-ui/core';

export const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
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
  cursor: pointer;
`;

export const PrimaryButton = styled(Btn)`
  color: #fff;
  background-color: #ab987a;
  border: 2px solid #ab987a;
  font-size: 10px;
  font-weight: 700;
  margin-left: 0.5rem;
  width: 80px;
  &:hover {
    background-color: #ab987a;
  }
`;

export const OutlinedButton = styled(Btn)`
  color: #ab987a;
  background-color: transparent;
  border: 2px solid #ab987a;
  font-size: 10px;
  font-weight: 700;
  margin-left: 0.5rem;
  width: 80px;

  &:hover {
    background-color: transparent;
  }
`;

export const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
