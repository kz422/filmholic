import React, { useEffect, useState } from 'react';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

import InfiniteScroll from 'react-infinite-scroller';

import NoImage from '../../images/no_image.png'

import Grid from '../Grid';
import Spinner from '../Spinner';
import Thumb from '../Thumb';

function SearchResult({ genreId, pageName }) {
  
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true); 

  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovieList = async(page) => {
    setLoading(true);
    await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=453487eb1f45dc7adae6655a7b5a63d3&with_genres=${28}&page=${page}`)
      .then(res => res.json())
      .then(res => {
        setTotalPages(res.total_pages);
        setMovieList([...movieList, ...res.results]);
        setLoading(false);
      });
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <div className="box">
        <InfiniteScroll
          loadMore={getMovieList}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Grid header={'Results...'}>
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
        </InfiniteScroll>
        { loading && <Spinner /> }
      </div>
      <div className="clearfix"></div>
    </div>
  );
}

export default SearchResult;
