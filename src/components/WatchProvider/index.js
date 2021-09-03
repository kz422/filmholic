import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './WatchProvider.styles';

const WatchProvider = ({ movieId, title }) => {
  const [info, setInfo] = useState([]);

  const providers = {
    nf: {url:`https://www.netflix.com/search?q=${title}`, id: 8},
    amazon: {url:`https://www.amazon.co.jp/s?k=${title}`, id: 9},
    hulu: {url:`https://www.hulu.jp/search?q=${title}`, id: 15},
    dtv: {url:`https://video.dmkt-sp.jp/search/?q=${title}`, id: 85},
    unext: {url:`https://video.unext.jp/freeword?query=${title}`, id: 84},
    disney: {url:`https://disneyplus.disney.co.jp/view/#!/search/${title}`, id: 390}
  }


  useEffect(() => {
    const getActorList = async() => {
      await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=453487eb1f45dc7adae6655a7b5a63d3`)
        .then(res => res.json())
        .then(res => {
          if(!res.results.JP) return

          if(res.results.JP.flatrate){
            setInfo(res.results.JP.flatrate)
          }
        });
    }
    getActorList();
  }, []);

  return (
    <div>
      {info.length ? <h5 style={{marginBottom:0}}>配信中</h5> : ''}
      <Wrapper>
        {info.map((x, i) => {
          return <div key={i} style={{margin:6}}>
            <a href={providers.nf.url} target="_blank" rel="noreferrer">
              {/* <p>{x.provider_id}</p> */}
              <img src={`https://image.tmdb.org/t/p/original/${x.logo_path}`} alt="logo" width="35px" style={{borderRadius:'5px'}} />
            </a>
          </div>
        })}
      </Wrapper>
    </div>
  )
}

// WatchProvider.propTypes = {
//   movie: PropTypes.object
// }

export default WatchProvider;
