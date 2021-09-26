import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { motion } from "framer-motion"

import { Image, Card } from "./ActorThumb.styles"

import 'react-circular-progressbar/dist/styles.css';


const ActorThumb = ({ image, movieId, clickable, title, rating, release }) => {

  return (
    <div>
      <motion.div
          animate={{ y: 0, opacity: 1}} initial={{ y: 100, opacity: 0 }} transition={{duration: 1}}
        >
        {clickable ? (
          <Link to={`/movie/${movieId}`}>
            <Card>
              <Image src={image} alt='movie-thumb' />
              <p>{title}</p>
            </Card>
          </Link>
        ) : (
          <Image src={image} alt='movie-thumb' />
        )}
        </motion.div>
    </div>
  )
}

ActorThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool
}

export default ActorThumb;
