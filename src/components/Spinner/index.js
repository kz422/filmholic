import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Wrapper } from './Spinner.styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    </div>
  );
}
