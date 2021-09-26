import * as React from 'react';

import { AppBar, Avatar, Button, Dialog, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Toolbar } from '@material-ui/core'
import { Slide } from '@material-ui/core';
// import Slide from '@mui/material/Slide';
import { makeStyles } from '@material-ui/core'
import { useState, useEffect } from 'react'

import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../AuthContext'

import { db } from '../../Firebase'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#1c1c1c',
    color: 'white'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const FollowPage = ({ buttonText, isFollow }) => {

  const { user } = useAuthContext()

  const classes = useStyles();

  const [open, setOpen] = useState(false)
  const [followList, setFollowList] = useState([])

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const getFollowList = async () => {
    const colRef = db.collection('users').doc(`${user?.uid}`).collection(`${isFollow? 'followers' : 'following'}`)
    colRef.onSnapshot((querySnapshot) => {
      const follow = []
      querySnapshot.forEach((doc)=>{
        follow.push(doc.data())
      })
      setFollowList(follow)
    })
  }

  useEffect(() => {
    getFollowList()
  },[])

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="text"
        color="secondary"
        className="button"
        size="small"
      >
        <div>
          {followList.length} 
          <p style={{ padding: '0', margin: '0', fontSize: '0.8rem' }}>{buttonText}</p>
        </div>
      </Button>
      <Dialog open={open} fullScreen PaperProps={{ style: {background: '#1c1c1c'} }} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="default" >
          <Toolbar>
            <IconButton onClick={handleClose}>
              <AiOutlineClose color="white" size="21px" />
            </IconButton>
            <h4>{buttonText}</h4>
          </Toolbar>
        </AppBar>
        { followList.length === 0 && <div style={{ color: 'white', margin: '10px' }}>0件です</div> }
        { followList.map((follow, i) => (
          <List key={i} style={{background: '#353535'}} disablePadding>
            <Link to={`/user/${follow.id}`} style={{ color: 'white' }}>
              <ListItem divider={true}>
                <ListItemAvatar>
                  <Avatar src={`${follow.photo}`} />
                </ListItemAvatar>
                <ListItemText primary={`${follow.name}`}></ListItemText>
              </ListItem>
            </Link>
            {/* <hr /> */}
            {/* <Divider /> */}
          </List>
        )) }
      </Dialog>
    </div>
  )
}

export default FollowPage
