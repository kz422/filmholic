import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom';
import { Bar } from './Header.styles';

export default function ButtonAppBar() {

  return (
    <div>
      <AppBar position="fixed" color={'transparent'} elevation={0}>
        <Toolbar>
          <Bar>
            <Link to={"/"}>
              <h1>
                MovieFreak
              </h1>
            </Link>
            <Button>Login</Button>
          </Bar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
