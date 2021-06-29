import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Typography, Button as Btn } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  backdrop: {
    zIndex: 1000,
    color: '#ab987a',
  },
}));

export const Label = styled(Typography)`
  font-size: 1rem;
  color: #0f1626;
`;

export const Form = styled.form`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.54);
  margin: 1rem 0;
  padding: 1rem;
  font-size: 1rem;
  color: #0f1626;
  border-radius: 6px;
  &::placeholder {
    color: rgba(0, 0, 0, 0.54);
    font-size: 0.9rem;
  }
  &:focus {
    outline: none;
  }
`;

export const Card = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 400px;
  border-radius: 5px;
  outline: none;
`;

export const StyledAvatar = styled.div`
  width: 120px;
  height: 120px;
  border: 3px solid #ab987a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
    url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  height: 60px;
`;

export const Title = styled(Typography)`
  color: #0f1626;
  font-weight: 700;
  font-size: 1.2rem;
`;

export const Button = styled(Btn)`
  color: #fff;
  background-color: #0f1626;
  font-weight: 400;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  &:hover {
    background-color: #0f1626;
  }
`;
