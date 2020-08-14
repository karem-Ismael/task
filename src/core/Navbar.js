import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {logOut} from '../auth/index'
import  {Redirect} from "react-router-dom";
import { withRouter } from "react-router";

import {signin, authenticated,isAuthenticated} from '../auth'
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);
const logout=()=>{
    logOut()
  
}

const Navbar=(props)=>{
    console.log(props)
    const classes = useStyles();

    return (
        <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      Company 
    </Typography>
    <Button color="inherit" onClick={()=>{logout();props.history.push('/signin')}}>Logout</Button>
  </Toolbar>
</AppBar>

    )
}
export default withRouter(Navbar)