import { auth } from "../../Firebase"
import { Navigate } from "react-router-dom"
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react'


import { motion } from "framer-motion";

import { AiOutlineLogout } from 'react-icons/ai'

import { useAuthContext } from "../../AuthContext"
import { Wrapper } from "./MyPage.styles"
import UserPageTab from "../UserPageTab";
import { Button } from "@material-ui/core";

import { db } from '../../Firebase'
import FollowPage from "../FollowPage";


const MyPage = () => {

  const [wallpaper, setWallpaper] = useState()
  
  const { user } = useAuthContext()
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
  
  useEffect(() => {
    getUserInfo()
  },[])

  if(!user) {
    alert('サインインしてください')
    return <Navigate to="/" />
  } else {
    return (
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
                color="primary" 
                onClick={logout} 
                startIcon={<AiOutlineLogout />}
                size="small"
              >
                LogOut
              </Button>
            </div>
          </div>
        </Wrapper>
        <UserPageTab />
      </motion.div>
    )
  }
}

export default MyPage
