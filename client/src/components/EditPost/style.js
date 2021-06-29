import styled from 'styled-components';
import { InputBase, Button as Btn } from '@material-ui/core';

export const Input = styled(InputBase)`
  color: #000;
  font-weight: 400;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  line-height: 1.5;
`;

export const Container = styled.div`
  padding: ${({ type }) => (type === 'COMMENT' ? '0 rem' : '0 1rem 1rem 1rem')};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Button = styled(Btn)`
  color: ${({ contained }) => (contained ? '#fff' : '#0f1626')};
  background-color: ${({ contained }) =>
    contained ? '#0f1626' : 'transparent'};
  border: 2px solid #0f1626;
  font-size: 12px;
  margin-right: 1rem;
  &:hover {
    background-color: ${({ contained }) =>
      contained ? '#0f1626' : 'transparent'};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
`;
