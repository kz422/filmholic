import React from 'react';
import { useParams } from 'react-router';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

import Spinner from './Spinner';

import { useMovieFetch } from '../Hooks/useMovieFetch';

import NoImage from '../images/no_image.jpg'
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';
import { Similar } from './Similar';
import { Link } from 'react-router-dom';

const Movie = () => {
  const { movieId } = useParams();

  const{ state: movie, loading, error } = useMovieFetch(movieId);

  if(loading) return <Spinner />
  if(error) return <div>エラーっす</div>

  return (
    <>
      {/* <BreadCrumb movieTitle={movie.original_title} /> */}
      <MovieInfo movie={movie} />
      <MovieInfoBar 
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
        />
      <h2 style={{ color: 'white', marginLeft: '16px' }}>キャスト</h2>
      <div style={{display:'flex', overflow:'scroll'}}>
        {movie.actors.map((actor, i) => (
          <Link to={`/actor/${actor.id}`} key={i}>
            <Actor
              key={actor.credit_id}
              name={actor.name}
              character={actor.character}
              actor={actor}
              imageUrl={
                actor.profile_path?
                `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
              }
            />
          </Link>
        ))}
      </div>
      <Similar movie={movie} />
    </>
  )
}

export default Movie;
