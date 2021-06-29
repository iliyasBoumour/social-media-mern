import styled from 'styled-components';
import { Typography, Avatar } from '@material-ui/core';

export const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const Name = styled(Typography)`
  color: #000;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
`;

export const Time = styled(Typography)`
  color: rgba(0, 0, 0, 0.7);
  font-weight: 300;
  font-size: 10px;
  margin-right: 10px;
`;

export const Comment = styled(Typography)`
  color: #000;
  font-weight: 400;
  font-size: 0.8rem;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  flex-grow: 2;
`;

export const Wrapper = styled.div`
  padding: 1rem 1rem 0.5rem 1rem;
  display: flex;
  &:last-child {
    padding: 1rem;
  }
`;
