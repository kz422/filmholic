import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './WatchProvider.styles';

const WatchProvider = ({ movieId, title }) => {
  const [info, setInfo] = useState([]);

  const nf = 8
  const amazon = 9
  const hulu = 15
  const dtv = 85
  const unext = 84
  const disney = 390

  const prov = {
    [nf]: `https://www.netflix.com/search?q=${title}`, 
    [amazon]:`https://www.amazon.co.jp/s?k=${title}`,
    [hulu]:`https://www.hulu.jp/search?q=${title}`,
    [dtv]:`https://video.dmkt-sp.jp/search/?q=${title}`,
    [unext]:`https://video.unext.jp/freeword?query=${title}`,
    [disney]:`https://disneyplus.disney.co.jp/view/#!/search/${title}`
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
            <a href={prov[x.provider_id]} target="_blank" rel="noreferrer">
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
