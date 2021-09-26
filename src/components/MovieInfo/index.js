import React, {  useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { useAuthContext } from "../../AuthContext"

import { Avatar, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { Alert } from "@material-ui/lab"

import { GiStarsStack } from 'react-icons/gi'
import { MdWallpaper } from 'react-icons/md'
import { AiFillYoutube } from 'react-icons/ai'
import { RiSearchEyeLine } from 'react-icons/ri'

import { IMAGE_BASE_URL, POSTER_SIZE, POSTER_SIZE_L } from '../../config';
import NoImage from '../../images/no_image.png'

import { Wrapper, Content, Text } from './MovieInfo.styles';

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import VisibilitySensor from "react-visibility-sensor";
import WatchProvider from '../WatchProvider';

import { motion } from "framer-motion"
import { db } from '../../Firebase';

import { Link } from 'react-router-dom';

const MovieInfo = ({ movie }) => {

  const { user } = useAuthContext()

  const [list, setList] = useState([])
  const [loading, isLoading] = useState(true)

  const [isWatched, setIsWatced] = useState()
  const [isWish, setIsWish] = useState()
  const [isFav, setIsFav] = useState()
  const [isWallpaper, setIsWallpaper] = useState()
  const [open, setOpen] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)

  const getWatchedList = async () => {
    const colRef = db.collection('users').doc(`${user?.uid}`).collection('watched').doc(`${movie.id}`)
    colRef.onSnapshot((querySnapshot) => {
      if(querySnapshot.exists) {
        setIsWatced(true)
      } else {
        setIsWatced(false)
      }
    })
  }
  const getWishList = async () => {
    const colRef = db.collection('users').doc(`${user?.uid}`).collection('wish').doc(`${movie.id}`)
    colRef.onSnapshot((querySnapshot) => {
      if(querySnapshot.exists) {
        setIsWish(true)
      } else {
        setIsWish(false)
      }
    })
  }
  const getFavList = async () => {
    const colRef = db.collection('users').doc(`${user?.uid}`).collection('fav').doc(`${movie.id}`)
    colRef.onSnapshot((querySnapshot) => {
      if(querySnapshot.exists) {
        setIsFav(true)
      } else {
        setIsFav(false)
      }
    })
  }
  const getWalpaper = async () => {
    const colRef = db.collection('users').doc(`${user?.uid}`).collection('userInfo').doc('wallpaper')
    colRef.onSnapshot((querySnapshot) => {
      if(querySnapshot.exists) {
        setIsWallpaper(true)
      } else {
        setIsWallpaper(false)
      }
    })
  }

  const handleOpen = () => {
    if(open){
      setOpen(false)
    } else {
      setOpen(true)
    }
  }
  const handleOpenSnack = () => {
    if(openSnack){
      setOpenSnack(false)
    } else {
      setOpenSnack(true)
    }
  }

  useEffect(() => {
    getWatchedList()
    getWishList()
    getFavList()
    getWalpaper()
    isLoading(false)
  }, [])

  // handle isWatched
  function addWatchedList() {
    db.collection('users').doc(user?.uid).collection('watched').doc(`${movie.id}`).set({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
      release: movie.release_date,
      popularity: movie.popularity,
      voteAve: movie.vote_average,
      createdAt: Date.now()
      // movieId: movie.id,
    })
  }
  function removeWatchedList() {
    db.collection('users').doc(user?.uid).collection('watched').doc(`${movie.id}`).delete()
  }

  function addWishList() {
    db.collection('users').doc(user?.uid).collection('wish').doc(`${movie.id}`).set({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
      release: movie.release_date,
      popularity: movie.popularity,
      voteAve: movie.vote_average,
      createdAt: Date.now()
      // movieId: movie.id,
    })
  }
  function removeWishList() {
    db.collection('users').doc(user?.uid).collection('wish').doc(`${movie.id}`).delete()
  }

  function addFavList() {
    db.collection('users').doc(user?.uid).collection('fav').doc(`${movie.id}`).set({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
      release: movie.release_date,
      popularity: movie.popularity,
      voteAve: movie.vote_average,
      createdAt: Date.now()
      // movieId: movie.id,
    })
  }
  function removeFavList() {
    db.collection('users').doc(user?.uid).collection('fav').doc(`${movie.id}`).delete()
  }
  function addWallpaper() {
    db.collection('users').doc(user?.uid).collection('userInfo').doc('wallpaper').set({
      backdrop: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    }).then(()=> {
      setOpenSnack(true)
      setOpen(false)
    })
  }
  function removeWallpaper() {
    db.collection('users').doc(user?.uid).collection('userInfo').doc('wallpaper').delete()
  }

  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration: 1}}>
        <Content>
          <motion.div
            animate={{ y: 0, opacity: 1}} initial={{ y: 100, opacity: 0 }} transition={{duration: 1}}
          >
            <div className="img-div">
              {movie.poster_path ? 
                <img className='thumb' src={`${IMAGE_BASE_URL}${POSTER_SIZE_L}${movie.poster_path}`} alt="thumbnail" />
                :<img className='thumb' src={NoImage} alt="NoImage..." />
              }
            </div>
          </motion.div>
          <Text>
            <motion.div initial={{x: 200}} animate={{ x: 0 }} transition={{duration: .8}}>
              <h1>{movie.title}</h1>
            </motion.div>
            <motion.div initial={{x: -200}} animate={{ x: 0 }} transition={{duration: .8}}>
              <p>{movie.release_date.replace(/-/g, '/')} {movie.status === 'Released' ? '公開' : '公開予定'}</p>
              <div className="list-button">
                <Tooltip 
                  title="サインインが必要です" 
                  placement="top"
                  disableHoverListener={user}
                >
                <span>
                  <ButtonGroup disabled={!user}>
                    <Button 
                      variant="contained" 
                      onClick={isWatched ? removeWatchedList : addWatchedList }
                      color={isWatched ? "secondary" : "default"}
                      >
                        視聴済み
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={isFav ? removeFavList : addFavList }
                      color={isFav ? "secondary" : "default"}
                      >
                        スキ
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={isWish ? removeWishList : addWishList }
                      color={isWish ? "secondary" : "default"}
                      >
                        観たい
                    </Button>
                  </ButtonGroup>
                </span>
                </Tooltip>
                {user && 
                  <Tooltip
                    title="マイページの背景画像に設定します"
                    placement="top"
                  >
                    <Button
                      style={{ marginLeft: '10px' }}
                      color={"default"}
                      onClick={handleOpen}
                      disabled={!user}
                    >
                      <MdWallpaper size="1.5rem" color="white" />
                    </Button>
                  </Tooltip>
                }
                <Dialog open={open} onClose={handleOpen} PaperProps={{ style: {background: '#1c1c1c', color: 'white'} }}>
                  <DialogTitle>確認</DialogTitle>
                  <DialogContent>
                    <DialogContentText style={{color: 'white'}}>マイページの背景画像として設定しますか？</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button color="primary" onClick={addWallpaper}>OK</Button>
                    <Button color="primary" onClick={handleOpen}>キャンセル</Button>
                  </DialogActions>
                </Dialog>
              </div>
              <p style={{ fontSize: 'small', whiteSpace: 'pre-wrap' }}>{movie.overview}</p>
            </motion.div>
            <div className="rating-directors">
              <div style={{textAlign: 'center'}}>
                <h3>Rating</h3>
                <div className="rating-circle">
                  <VisibilitySensor>
                      {({ isVisible }) => {
                        const percentage = isVisible ? movie.vote_average * 10 : 0;
                        return (
                          <CircularProgressbarWithChildren
                            value={percentage}
                            styles={buildStyles({
                              pathTransitionDuration: 2,
                              pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                              textColor: '#f88',
                              trailColor: '#d6d6d6',
                              backgroundColor: '#3e98c7',
                            })}
                          >
                          <GiStarsStack color="gold" />
                          <div style={{ fontSize: 12 }}>
                            <strong>{movie.vote_average}</strong>
                          </div>
                          </CircularProgressbarWithChildren>
                        );
                      }}
                    </VisibilitySensor>
                </div>
              </div>
              <div className="director" style={{textAlign: 'center'}}>
                <h3>監督</h3>
                {movie.directors.map((director, i) => (
                  <Link to={`/person/${director.id}`} key={i}>
                    <div>
                      <Avatar src={`https://image.tmdb.org/t/p/w92${director?.profile_path}`}/>
                      <p key={director.credit_id}>{director.name}</p>
                      {/* <img src={`https://image.tmdb.org/t/p/w92${director.profile_path}`} width="40px" /> */}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="search" style={{ marginTop:16 }}>
              <div className="buttons">
                <WatchProvider movieId={movie.id} title={movie.title} />
              </div>
            </div>
            <div style={{ display: "flex", marginTop:12 }}>
              <a href={`https://www.youtube.com/results?search_query=${movie.title}`} target="_blank" rel="noreferrer" style={{ color: "white" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AiFillYoutube color="red" size="24px"/>
                  <p style={{ margin: 0, paddingLeft: "5px" }}>YouTubeで検索</p>
                </div>
              </a>
              <a href={`https://www.google.com/search?q=${movie.title}`} target="_blank" rel="noreferrer" style={{ color: "white" }}>
                <div style={{ display: "flex", alignItems: "center", marginLeft: "28px" }}>
                  <RiSearchEyeLine size="21px"/>
                  <p style={{ margin: 0, paddingLeft: "5px" }}>WEBで検索</p>
                </div>
              </a>
            </div>
          </Text>
        </Content>
      </motion.div>
      <div>
      <Snackbar
        open={openSnack}
        autoHideDuration={4000}
        onClose={handleOpenSnack}
      >
        <Alert onClose={handleOpenSnack} severity="success" sx={{ width: '100%' }}>
          設定しました！
        </Alert>
      </Snackbar>
    </div>
    </Wrapper>
  )
}

MovieInfo.propTypes = {
  movie: PropTypes.object
}

export default MovieInfo;
