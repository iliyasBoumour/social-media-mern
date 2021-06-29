import styled from 'styled-components';
import { Typography } from '@material-ui/core';

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
