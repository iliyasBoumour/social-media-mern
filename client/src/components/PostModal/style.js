import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  wrapper: {
    outline: 'none',
    borderRadius: '3px',
    backgroundColor: '#fff',
    maxHeight: '95vh',
    overflowY: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: '90vw',
    },
    [theme.breakpoints.up('sm')]: {
      width: '570px',
    },
    [theme.breakpoints.up('md')]: {
      width: '620px',
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundColor: '#ab987a',
    },
    '&::-webkit-scrollbar': {
      width: '8px',
    },
  },
}));
