import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../Firebase';

import { Button, Tooltip } from '@material-ui/core';

import { useAuthContext } from "../../AuthContext"

import Spinner from '../Spinner';
import Grid from '../Grid';
import ActorThumb from './ActorThumb';

import { RiSearchEyeLine, RiChatHeartLine } from 'react-icons/ri'

import { IMAGE_BASE_URL, POSTER_SIZE, PROFILE_SIZE } from '../../config';
import NoImage from '../../images/no_image.png'

import { Wrapper, Content, Text } from './ActorInfo.styles';
import {ReadMoreToggler} from 'read-more-read-less-toggler'

import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';


const ActorInfo = () => {
  const { user } = useAuthContext()
  
  const [info, setInfo] = useState(1);
  const [isFavAct, setIsFavAct] = useState()

  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstmovie, setFirstMovie] = useState();
  const [errorMes, setErrorMes] = useState();

  const {actorId} = useParams()

  const getFavActList = async () => {
    const colRef = db.collection('users').doc(`${user?.uid}`).collection('actors').doc(`${actorId}`)
    colRef.onSnapshot((querySnapshot) => {
      if(querySnapshot.exists) {
        setIsFavAct(true)
      } else {
        setIsFavAct(false)
      }
    })
  }

  const getActorList = async() => {
    setLoading(true);
    await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=453487eb1f45dc7adae6655a7b5a63d3&language=en-US`)
      .then(res => res.json())
      .then(res => {
        setInfo(res)
        setLoading(false);
      }).catch(error =>{
        setErrorMes(error)
      })
  }

  const getMovieList = async() => {
    setLoading(true);
    await fetch(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=453487eb1f45dc7adae6655a7b5a63d3&language=ja-JP`)
      .then(res => res.json())
      .then(res => {
        setMovieList([...movieList, ...res.cast]);
        setFirstMovie(res.cast[0]?.backdrop_path)
        setLoading(false);
      });
  }

  useEffect(() => {
    getMovieList()
    getActorList()
    getFavActList()
  }, []);

  function addFavActList() {
    db.collection('users').doc(user?.uid).collection('actors').doc(`${actorId}`).set({
      id: info.id,
      name: info.name,
      profile_path: info.profile_path,
      bd: info.birthday
    })
  }
  function removeFavList() {
    db.collection('users').doc(user?.uid).collection('actors').doc(`${actorId}`).delete()
  }

  if(loading) return <Spinner />
  if(errorMes) return <div>エラーっす</div>

  return (
  <>
  <Wrapper backdrop={firstmovie}>
    <Content>
    <motion.div
        animate={{ y: 0, opacity: 1}} initial={{ y: 100, opacity: 0 }} transition={{duration: 1}}
      >
        <div className="img-div">
          {info.profile_path ? 
            <img className='thumb' src={`${IMAGE_BASE_URL}${PROFILE_SIZE}${info.profile_path}`} alt="thumbnail" />
            :<img className='thumb' src={NoImage} alt="NoImage..." />
          }
        </div>
      </motion.div>
      <Text>
        <motion.div initial={{x: 200, opacity: 0}} animate={{ x: 0, opacity: 1 }} transition={{duration: 1}}>
          <h1>{info.name}</h1>
          {info.known_for_department === "Directing" ? ' 監督' : ''}
        </motion.div>
        <motion.div initial={{x: -200, opacity: 0}} animate={{ x: 0, opacity: 1 }} transition={{duration: 1}}>
          <p>{info.birthday}生まれ</p>
          <div className="list-button">
          <Tooltip title="サインインが必要です" 
                  placement="top"
                  disableHoverListener={user}
          >
            <span>
              <Button 
                variant="contained" 
                onClick={isFavAct ? removeFavList : addFavActList }
                color={isFavAct ? "secondary" : "default"}
                disabled={!user}
                startIcon={<RiChatHeartLine size="15px" />}
                >
                  スキ
              </Button>
            </span>
          </Tooltip>
          </div>
          <h3>略歴</h3>
          <ReadMoreToggler topGradient="gray" bottomGradient="white">{info?.biography}</ReadMoreToggler>
          {/* <p className="truncate">{info.biography}</p> */}
          <div className="rating-directors">
            <div>
              <h3>出身</h3>
              <p>{info?.place_of_birth}</p>
              {/* <div className="score">{movie.vote_average}</div> */}
            </div>
          </div>
          <a href={`https://www.google.com/search?q=${info?.name}`} target="_blank" rel="noreferrer" style={{ color: "white" }}>
                <div style={{ display: "flex", alignItems: "center", marginTop: "28px" }}>
                  <RiSearchEyeLine size="21px" />
                  <p style={{ margin: 0, paddingLeft: "5px" }}>WEBで検索</p>
                </div>
              </a>
        </motion.div>
      </Text>
    </Content>
  </Wrapper>
  <div className="box" style={{ minHeight: '40vh', marginBottom: '20px' }}>
      <Grid header={'作品'}>
        {movieList.map((movie, index) => (
          <ActorThumb 
            key={index}
            clickable
            image={
              movie.poster_path
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path 
                : NoImage
            }
            movieId={movie.id}
            title={
              movie.poster_path
                ? null
                : movie.title
            }
          />
          // <div key={movie.id}>{movie.title}</div>
        ))}
      </Grid>
      { loading && <Spinner /> }
    </div>
  </>
  )
}

ActorInfo.propTypes = {
  movie: PropTypes.object
}

export default ActorInfo;
