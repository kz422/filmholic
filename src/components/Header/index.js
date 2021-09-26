import { useEffect, useState} from 'react';
import * as React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import { useAuthContext } from '../../AuthContext';
import { useLocation } from 'react-router';

import { RiAccountCircleLine } from 'react-icons/ri'
import { AiFillNotification, AiOutlineClose } from 'react-icons/ai'

import { Link } from 'react-router-dom';
import { Bar, Wrapper } from './Header.styles';
import AuthScreen from '../AuthScreen';

import { db } from '../../Firebase';

import logo from '../../images/logo.png'
import { Avatar, Badge, Dialog, AppBar, IconButton, List, ListItem, Slide, Button, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core';

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

export default function ButtonAppBar() {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const { user } = useAuthContext()

  const [show, setShow] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setIsNotification] = useState(false)
  const [notificationList, setIsNotificationList] = useState([])
  const location = useLocation()

  const classes = useStyles()

  const handleNotification = async (followedId, i) => {
    const colRef = db.collection('users').doc(`${user?.uid}`).collection('notification').doc(`${followedId}`)
    colRef.delete()
    notificationList.splice(i)
  }

  const getNotificationList = async () => {
    const colRef = db.collection('users').doc(`${user?.uid}`).collection('notification').where("kind", "==" , "followed")
    colRef.onSnapshot((querySnapshot) => {
      if(!querySnapshot.empty) {
        setIsNotification(false)
        const notifications = []
        querySnapshot.forEach((doc)=>{
          notifications.push(doc.data())
        })
        setIsNotificationList(notifications)
      } else {
        setIsNotification(true)
      }
    })
  }

  const handleMenuOpen = () => {
    if(showNotification) {
      setShowNotification(false)
    } else {
      setShowNotification(true)
    }
  }

  const transitionNavBar = () => {
    if(window.scrollY > 70) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    getNotificationList()
    window.addEventListener("scroll", transitionNavBar)
    return () => window.removeEventListener("scroll", transitionNavBar)
  }, [])

  function UserPage() {
    if(location.pathname === '/mypage') {
      return (
        <>
          <Badge invisible={notification} color="secondary" badgeContent={notificationList.length}>
            <AiFillNotification 
              size="1.5rem" 
              color="white" 
              onClick={handleMenuOpen}
              style={{ cursor: "pointer" }}
            />
          </Badge>
          <Dialog
            open={showNotification}
            onClose={handleMenuOpen}
            PaperProps={{ style: {background: '#1c1c1c', color: 'white', minWidth: '300px', minHeight: '300px' } }}
            fullScreen={fullScreen}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar} color="default">
          <Toolbar>
            <IconButton onClick={handleMenuOpen}>
              <AiOutlineClose color="white" size="21px" />
            </IconButton>
            <h4>お知らせ</h4>
          </Toolbar>
        </AppBar>
        { notificationList.length === 0 && <div style={{ color: 'white', margin: '10px' }}>0件です</div> }
        { notificationList.map((notification, i) => (
          <List key={i} style={{background: '#353535'}} disablePadding>
            <ListItem divider={true} style={{justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems: 'center'}}>
                <Avatar src={`${notification.photo}`} />
                <Link to={`/user/${notification.id}`} style={{ color: 'white' }} onClick={handleMenuOpen}>
                  <p  style={{ fontSize: '0.7rem', marginLeft: '6px' }}>{`${notification.name}`}</p>
                </Link>
                <p  style={{ fontSize: '0.7rem' }}>がフォローしました</p>
                </div>
              <div>
                <Button onClick={() => handleNotification(notification.id, i)} color="primary">OK</Button>
              </div>
            </ListItem>
          </List>
        )) }
          </Dialog>
        </>
      )
    } else {
      return (
        <Link to={"mypage"}>
          <Badge variant="dot" invisible={notification} color="secondary">
            <RiAccountCircleLine size="2rem" color="white" />
          </Badge>
        </Link>
      )
    }
  }

  return (
    <Wrapper>
      <div className={`nav ${show && 'nav__black'}`} elevation={0}>
        <Toolbar>
          <Bar>
            <Link to={"/"}>
              <img src={logo} alt="logo" width="90px" style={{ marginBottom: '5px' }} />
            </Link>
            {user ? <UserPage /> : <AuthScreen buttonText={"LogIn"}  />}
          </Bar>
        </Toolbar>
      </div>
    </Wrapper>
  );
}
