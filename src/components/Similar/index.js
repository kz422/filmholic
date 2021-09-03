import React, { useState, useEffect } from 'react'

import { Content, Wrapper } from './Similar.styles';

import { Link } from 'react-router-dom';

export const Similar = ({ movie }) => {

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovieList = async() => {
      await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=453487eb1f45dc7adae6655a7b5a63d3&language=en-US&page=1`)
        .then(res => res.json())
        .then(res => {
          setMovieList([...movieList, ...res.results]);
        });
    }
    getMovieList();
  }, []);

  return (
    <Wrapper>
      <h3>類似作品</h3>
      <Content>
        {movieList.map((movie, i) => (
          <div key={i}>
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="poster" />
            </Link>
          </div>
        ))}
      </Content>
    </Wrapper>
  )
}
