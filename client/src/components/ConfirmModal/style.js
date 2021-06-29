import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Typography, IconButton } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
}));

export const Card = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 400px;
  border-radius: 5px;
  outline: none;
`;

export const Header = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 10%;
`;

export const Title = styled(Typography)`
  color: #000;
  font-weight: 700;
  font-size: 1.3rem;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

export const Text = styled(Typography)`
  color: #ccc;
  font-weight: 400;
  font-size: 1.1rem;
  text-align: center;
`;

export const Button = styled(IconButton)`
  color: ${({ contained }) => (contained ? '#fff' : '#0f1626')};
  background-color: ${({ contained }) =>
    contained ? '#0f1626' : 'transparent'};
  border: 2px solid #0f1626;
  padding: 1rem;
  font-size: 2rem;
  &:hover {
    background-color: ${({ contained }) =>
      contained ? '#0f1626' : 'transparent'};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 2rem;
`;
