import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';

export const PrimarydButton = styled(Button)`
  color: #fff;
  background-color: #0f1626;
  border: 3px solid #0f1626;
  font-weight: 400;
  border-radius: 6px;
  width: 100%;
  &:hover {
    background-color: #0f1626;
  }
`;

export const OutlinedButton = styled(Button)`
  color: #0f1626;
  background-color: transparent;
  border: 3px solid #0f1626;
  font-weight: 700;
  border-radius: 6px;
  width: 100%;
  &:hover {
    background-color: transparent;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
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
  font-size: 1.5rem;
`;
