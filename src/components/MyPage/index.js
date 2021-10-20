import { auth } from "../../Firebase"
import { Navigate } from "react-router-dom"
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react'

import { Alert } from "@material-ui/lab"

import { motion } from "framer-motion";

import { AiOutlineLogout } from 'react-icons/ai'
import { FaRegCopy } from 'react-icons/fa'

import { useAuthContext } from "../../AuthContext"
import { Wrapper } from "./MyPage.styles"
import UserPageTab from "../UserPageTab";
import { Button, Snackbar } from "@material-ui/core";

import {CopyToClipboard} from 'react-copy-to-clipboard';

import { db } from '../../Firebase'
import FollowPage from "../FollowPage";


const MyPage = () => {

  const [wallpaper, setWallpaper] = useState()
  const [open, setOpen] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const { user } = useAuthContext()

  const myUrl = `https://movie-hack.com/user/${user.uid}`

  const getUserInfo = async () => {
    const colRef = db.collection('users').doc(`${user?.uid}`).collection('userInfo').doc('wallpaper')
    colRef.onSnapshot((querySnapshot) => {
      setWallpaper(querySnapshot.data().backdrop)
    })
  }

  const navigate = useNavigate()

  const logout = () => {
    auth.signOut()
    navigate("/")
  }

  const handleOpenSnack = () => {
    if(openSnack){
      setOpenSnack(false)
    } else {
      setOpenSnack(true)
    }
  }
  
  useEffect(() => {
    getUserInfo()
  },[])

  if(!user) {
    alert('サインインしてください')
    return <Navigate to="/" />
  } else {
    return (
      <>
      <motion.div initial={{ opacity: '0', y: 200 }} animate={{ opacity: '1', y: 0 }} transition={{ duration: .7 }}>
        <Wrapper backdrop={wallpaper}>
          <div className="container">
            <div className="user-info">
              <img src={`${user.photoURL}`} alt="userphoto" />
              <p style={{ margin: '0' }}>{user.displayName}</p>
            </div>
            <div className="buttons">
              <FollowPage buttonText={"フォロワー"} isFollow={true} />
              <FollowPage buttonText={"フォロー中"} isFollow={false} />
            </div>
            <div>
              <Button 
                variant="outlined" 
                color="inherit" 
                onClick={logout} 
                startIcon={<AiOutlineLogout />}
                size="small"
                style={{ marginRight: '16px' }}
              >
                Log Out
              </Button>
              <CopyToClipboard text={`${myUrl}`} onCopy={() => setOpenSnack(true)}>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  startIcon={<FaRegCopy />}
                  size="small"
                >
                  URLをコピー
                </Button>
              </CopyToClipboard>
            </div>
          </div>
        </Wrapper>
        <UserPageTab />
      </motion.div>
      <div>
        <Snackbar
          open={openSnack}
          autoHideDuration={4000}
          onClose={handleOpenSnack}
        >
          <Alert onClose={handleOpenSnack} severity="success" sx={{ width: '100%' }}>
            コピーしました！
          </Alert>
        </Snackbar>
      </div>
      </>
    )
  }
}

export default MyPage
