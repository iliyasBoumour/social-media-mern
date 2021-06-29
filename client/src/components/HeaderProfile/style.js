import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const Header = styled.div`
  background-color: #ab987a;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  margin-bottom: 1rem;
  height: 220px;
`;

export const StyledAvatar = styled(Avatar)`
  width: 90px;
  height: 90px;
  border: 3px solid #fff;
`;
