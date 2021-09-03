import React from 'react';

import HeroImage from './HeroImage';

import { BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

import { useHomeFetch } from '../Hooks/useHomeFetch'

import ScrollableTabsButtonAuto from './Nav';

const Home = () => {
  const { state, error, searchTerm } = useHomeFetch();

  const randomNum = Math.floor(Math.random() * 5 )

  if(error) return <div>エラーっす</div>

  return (
    <>
      {!searchTerm && state.results[0]? (
        <HeroImage 
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[randomNum]?.backdrop_path}`}
          title={state.results[randomNum]?.original_title}
          text={state.results[randomNum]?.overview}
          num={randomNum + 1}
        />
      ) :null}
      <ScrollableTabsButtonAuto />
    </>
  )
}

export default Home;
