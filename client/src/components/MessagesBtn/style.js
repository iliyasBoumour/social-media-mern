import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';

export const FloatBtn = styled(Fab)`
  background-color: #0f1626;
  &:hover {
    background-color: #0f1626;
    opacity: 0.9;
  }
`;

export const StyledBadge = styled(Badge)`
  margin-right: 0.5rem;
  position: fixed;
  bottom: 3%;
  right: 2%;
`;
