import { React, useState} from 'react'
// import { useHistory } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router';
import { auth, provider } from '../../Firebase';
import { db } from '../../Firebase';

//material-ui
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//icons
import { FcGoogle } from 'react-icons/fc'
import { RiAccountCircleLine } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'

//styled
import { Wrapper } from './AuthScreen.styles'
import { IconButton } from '@material-ui/core';

const AuthScreen = ({ buttonText }) => {

  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [open, setOpen] =  useState(false);

  const errorMessageFromFB = "Firebase: The popup has been closed by the user before finalizing the operation. (auth/popup-closed-by-user)."

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setUserData = async() => {
    const user = auth.currentUser
    db.collection('users').doc(`${auth.currentUser.uid}`).collection('userInfo').doc('generalInfo').set({
      name: user.displayName,
      id: user.uid,
      photo: user.photoURL,
    })
  }

  const login = async (e) => {
    try {
      await auth.signInWithPopup(provider).then(() => {
        setUserData()
      })
      navigate('/mypage')
      // history.push('/')
    } catch(error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ background: 'transparent', border: 'none', cursor: "pointer" }}>
        <RiAccountCircleLine size={'2rem'} />
      </Button>
      <Dialog
        keepMounted
        onClose={handleClose}
        open={open}
      >
      <Wrapper>
        <DialogTitle id="alert-dialog-slide-title">{"サインイン"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            サインインすることですべての機能を利用できます
          </DialogContentText>
          {error === errorMessageFromFB && <p>キャンセルされました</p>}
          <Button variant="contained" className="signin-button" onClick={login} startIcon={<FcGoogle />} style={{ fontFamily: 'Arial', textTransform: 'none' }}>Googleでサインイン</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Wrapper>
      </Dialog>
    </div>
  )
}

export default AuthScreen
