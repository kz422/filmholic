import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Image } from './Thumb.styles';

import { motion } from "framer-motion"

import "./Thumb.styles"

import 'react-circular-progressbar/dist/styles.css';


const Thumb = ({ image, movieId, clickable, title, rating, release }) => {

  return (
    <div>
      <motion.div
          animate={{ y: 0, opacity: 1}} initial={{ y: 100, opacity: 0 }} transition={{duration: 1}}
        >
        {clickable ? (
          <Link to={`/movie/${movieId}`}>
            <Image src={image} alt='movie-thumb' />
          </Link>
        ) : (
          <Image src={image} alt='movie-thumb' />
        )}
        </motion.div>
    </div>
  )
}

Thumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool
}

export default Thumb;
