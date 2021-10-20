import { Navigate, useParams } from "react-router-dom"
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react'

import { motion } from "framer-motion";

import logoBd from '../../images/logo_bd.png'

import { RiUserFollowLine, RiUserLine } from 'react-icons/ri'

import { useAuthContext } from "../../AuthContext"
import { Wrapper } from "./UserPage.styles"
import UserPageTab from "../UserPageTab";
import { Button } from "@material-ui/core";

import { db } from '../../Firebase'


const UserPage = () => {
  const navigate = useNavigate()
  const { userId } = useParams()

  const [wallpaper, setWallpaper] = useState()
  const [userInfo, setUserInfo] = useState()
  const [isFollow, setIsFollow] = useState()
  
  const { user } = useAuthContext()
  
  const getUserInfo = async () => {
    const colRef = db.collection('users').doc(`${userId}`).collection('userInfo').doc('wallpaper')
    colRef.onSnapshot((querySnapshot) => {
      if(querySnapshot.data()?.backdrop) {
        setWallpaper(querySnapshot.data()?.backdrop)
      } else {
        setWallpaper(logoBd)
      }
    })
  }
  const getUser = async () => {
    const colRef = db.collection('users').doc(`${userId}`).collection('userInfo').doc('generalInfo')
    colRef.onSnapshot((querySnapshot) => {
      setUserInfo(querySnapshot.data())
    })
  }

  const getFollowList = async () => {
    const colRef = db.collection('users').doc(`${user?.uid}`).collection('following').doc(`${userId}`)
    colRef.onSnapshot((querySnapshot) => {
      if(querySnapshot.exists) {
        setIsFollow(true)
      } else {
        setIsFollow(false)
      }
    })
  }

  const addFollowList = () => {
    db.collection('users').doc(user?.uid).collection('following').doc(`${userId}`).set({
      id: userId,
      name: userInfo?.name,
      photo: userInfo?.photo
    })
    db.collection('users').doc(`${userId}`).collection('followers').doc(user?.uid).set({
      id: user.uid,
      name: user.displayName,
      photo: user.photoURL
    })
    db.collection('users').doc(`${userId}`).collection('notification').doc(user?.uid).set({
      id: user.uid,
      name: user.displayName,
      photo: user.photoURL,
      kind: "followed"
    })
  }
  const removeFollowList = () => {
    db.collection('users').doc(user?.uid).collection('following').doc(`${userId}`).delete()
    db.collection('users').doc(`${userId}`).collection('followers').doc(user?.uid).delete()
    db.collection('users').doc(`${userId}`).collection('notification').doc(user?.uid).delete()
  }

  useEffect(() => {
    getUserInfo()
    getUser()
    getFollowList()
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
              <img src={`${userInfo?.photo}`} alt="userphoto" />
              <p>{userInfo?.name}</p>
            </div>
            <div>
              { user.uid !== userId ? 
              <Button 
                variant="contained"
                color={isFollow ? "secondary" : "default"}
                onClick={isFollow ? removeFollowList : addFollowList} 
                startIcon={isFollow? <RiUserFollowLine /> : <RiUserLine />}
                size="small"
                disabled={!user}
              >
                {isFollow ? 'フォロー中' : 'フォローする'}
              </Button>
              : <Button href="/mypage" variant="contained" size="small" color="primary">マイページへ</Button>
              }
            </div>
          </div>
        </Wrapper>
        <UserPageTab />
      </motion.div>
    )
  }
}

export default UserPage
