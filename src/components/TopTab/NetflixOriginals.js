import React, { useEffect, useState } from 'react';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

import NoImage from '../../images/no_image.jpg'
import Button from '../Button';

import Grid from '../Grid';
import Spinner from '../Spinner';
import Thumb from '../Thumb';

function NetflixOriginals() {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovieList = async() => {
      setLoading(true);
      await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=453487eb1f45dc7adae6655a7b5a63d3&with_networks=213&language=ja&page=${page}`)
        .then(res => res.json())
        .then(res => {
          setTotalPages(res.total_pages);
          setMovieList([...movieList, ...res.results]);
          setLoading(false);
        });
    }
    getMovieList();
  }, [page]);

  return (
    <div>
      <div className="box">
      <Grid header={'Now Showing'}>
          {movieList.map(movie => (
            <Thumb 
              key={movie.id}
              clickable
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path 
                  : NoImage
              }
              movieId={movie.id}
            />
            // <div key={movie.id}>{movie.title}</div>
          ))}
        </Grid>
        { loading && <Spinner /> }
      </div>
      <div className="clearfix"></div>
      {totalPages !== page && <Button text='Load More' callback={() => setPage(page + 1)}>{loading ? 'Loading...' : 'Load Mor'}</Button>}
    </div>
  );
}

export default NetflixOriginals;
