import styled from 'styled-components';
import { Typography, Avatar } from '@material-ui/core';

export const Div = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 0.7rem;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    background-color: rgba(196, 196, 196, 0.25);
  }
  ${({ snackbar }) =>
    snackbar &&
    `width: 250px;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
border-radius: 6px;

  &:hover {
    background-color:#fff;
  }
  `}
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

export const Time = styled(Typography)`
  color: rgba(0, 0, 0, 0.7);
  font-weight: 300;
  font-size: 12px;
  margin-left: 0.5rem;
`;

export const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`;
