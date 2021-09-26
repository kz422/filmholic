import React from 'react';

import Carousel from 'react-material-ui-carousel'

import HeroImage from './HeroImage';

import { BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

import { useHomeFetch } from '../Hooks/useHomeFetch'

import ScrollableTabsButtonAuto from './Nav';

const Home = () => {
  const { state, error, searchTerm } = useHomeFetch();

  if(error) return <div>エラーっす</div>

  return (
    <>
      {!searchTerm && state.results[0]? (
        <Carousel
          indicators={false}
          interval={"7000"}
        >
          {state.results.map((movie, i) => (
            <HeroImage 
              key={i}
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[i]?.backdrop_path}`}
              title={state.results[i]?.original_title}
              text={state.results[i]?.overview}
              id={state.results[i]?.id}
              num={i + 1}
            />
          ))}
        </Carousel>
      ) :null}
      <ScrollableTabsButtonAuto />
    </>
  )
}

export default Home;
