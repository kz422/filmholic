import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import Thumb from '../Thumb';

import Grid from '../Grid';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import NoImage from '../../images/no_image.jpg'

import { Wrapper, Content, Text } from './ActorInfo.styles';
import {ReadMoreToggler} from 'read-more-read-less-toggler'

import { motion } from 'framer-motion';


const ActorInfo = () => {
  const [info, setInfo] = useState(1);

  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstmovie, setFirstMovie] = useState();
  const [errorMes, setErrorMes] = useState();

  const location = useLocation();

  const actorId = location.pathname.split('/')[2]


  useEffect(() => {
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
    getActorList();
  }, [actorId]);

  useEffect(() => {
    const getMovieList = async() => {
      setLoading(true);
      await fetch(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=453487eb1f45dc7adae6655a7b5a63d3&language=en-US`)
        .then(res => res.json())
        .then(res => {
          setMovieList([...movieList, ...res.cast]);
          setFirstMovie(res.cast[0].backdrop_path)
          setLoading(false);
        });
    }
    getMovieList();
  }, []);

  if(loading) return <Spinner />
  if(errorMes) return <div>エラーっす</div>

  return (
  <>
  <Wrapper backdrop={firstmovie}>
    <Content>
      <Thumb
        image={
          info.profile_path ?
          `${IMAGE_BASE_URL}${POSTER_SIZE}${info.profile_path}`
          : NoImage
        }
        clickable={false}
        isZoom={false}
        className="thumb"
      />
      <Text>
        <motion.div initial={{x: 200, opacity: 0}} animate={{ x: 0, opacity: 1 }} transition={{duration: 1}}>
          <h1>{info.name}</h1>
        </motion.div>
        <motion.div initial={{x: -200, opacity: 0}} animate={{ x: 0, opacity: 1 }} transition={{duration: 1}}>
          <p>BD : {info.birthday}</p>
          <div className="list-button">
            <button>MyListに追加</button>
          </div>
          <h3>Biography</h3>
          <ReadMoreToggler topGradient="gray" bottomGradient="white">{info?.biography}</ReadMoreToggler>
          {/* <p className="truncate">{info.biography}</p> */}
          <div className="rating-directors">
            <div>
              <h3>Born</h3>
              <p>{info.place_of_birth}</p>
              {/* <div className="score">{movie.vote_average}</div> */}
            </div>
          </div>
        </motion.div>
      </Text>
    </Content>
  </Wrapper>
  <div className="box">
      <Grid header={'Films'}>
        {movieList.map((movie, index) => (
          <Thumb 
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
                ? ''
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
