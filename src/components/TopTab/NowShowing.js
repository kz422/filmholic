import React, { useEffect, useState } from 'react';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

import NoImage from '../../images/no_image.png'
import Button from '../Button';

import Grid from '../Grid';
import Spinner from '../Spinner';
import Thumb from '../Thumb';

function NowShowingTab() {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovieList = async() => {
      setLoading(true);
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=453487eb1f45dc7adae6655a7b5a63d3&language=ja&page=${page}&region=JP`)
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
      {totalPages !== page && <Button text='さらに読み込む' callback={() => setPage(page + 1)}>{loading ? 'Loading...' : 'Load Mor'}</Button>}
    </div>
  );
}

export default NowShowingTab;
