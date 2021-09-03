import React from 'react';
import PropTypes from 'prop-types';

import { GiStarsStack } from 'react-icons/gi'

import Thumb from '../Thumb';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import NoImage from '../../images/no_image.jpg'

import { Wrapper, Content, Text } from './MovieInfo.styles';

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import VisibilitySensor from "react-visibility-sensor";
import WatchProvider from '../WatchProvider';

import { motion } from "framer-motion"

const MovieInfo = ({ movie }) => {

  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration: .3}}>
        <Content>
          <Thumb
            image={
              movie.poster_path ?
              `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
            }
            clickable={false}
            isZoom
            className="thumb"
          />
          <Text>
            <motion.div initial={{x: 200}} animate={{ x: 0 }}>
              <h1>{movie.title}</h1>
            </motion.div>
            <motion.div initial={{x: -200}} animate={{ x: 0 }}>
              <p>{movie.status} : {movie.release_date}</p>
              <div className="list-button">
                <button>見た</button>
                <button>MyListに追加</button>
              </div>
              <p>{movie.overview}</p>
            </motion.div>
            <div className="rating-directors">
              <div>
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
              <div className="director">
                <h3>Director{movie.directors.length > 1 ? 'S' : ''}</h3>
                {movie.directors.map(director => (
                  <p key={director.credit_id}>{director.name}</p>
                ))}
              </div>
            </div>
            <div className="search" style={{marginTop:16}}>
              <div className="buttons">
                <WatchProvider movieId={movie.id} title={movie.title} />
                {/* <a href={`https://www.youtube.com/results?search_query=${movie.title}`} target="_blank" rel="noreferrer">
                  <AiFillYoutube color="red" size="2rem" />
                </a>
                <a href={`https://www.netflix.com/search?q=${movie.title}`} target="_blank" rel="noreferrer">
                  <RiNetflixFill color="red" size="1.6rem" />
                </a>
                <a className="youtube" href={`https://www.hulu.jp/search?q=${movie.title}`} target="_blank" rel="noreferrer">
                  <SiHulu size="1.4rem" color="#1ce783" />
                </a> */}
              </div>
            </div>
          </Text>
        </Content>
      </motion.div>
    </Wrapper>
  )
}

MovieInfo.propTypes = {
  movie: PropTypes.object
}

export default MovieInfo;
