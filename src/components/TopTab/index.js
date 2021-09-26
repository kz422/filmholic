import React from 'react'

import { POSTER_SIZE, IMAGE_BASE_URL } from '../../config';

import { useHomeFetch } from '../../Hooks/useHomeFetch'

import InfiniteScroll from 'react-infinite-scroller';

import NoImage from '../../images/no_image.png';
import Grid from '../Grid';
import Thumb from '../Thumb';
import Spinner from '../Spinner';
import SearchBar from '../SearchBar';
import Button from '../Button';

export const TopTab = () => {

  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();

  if(error) return <div>エラーっす</div>
  
  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
        <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
          {state.results.map(movie => (
            <Thumb 
              key={movie.id}
              clickable
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path 
                  : NoImage
              }
              movieId={movie.id}
              title={movie?.title}
              rating={movie?.vote_average}
              release={movie?.release_date}
              isZoom={true}
            />
            // <div key={movie.id}>{movie.title}</div>
          ))}
        </Grid>
        {loading && <Spinner />}
        {state.page < state.total_pages && !loading && (
          <Button text='さらに読み込む' callback={() => setIsLoadingMore(true)} />
        )}
    </div>
  )
}
