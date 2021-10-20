import styled from "styled-components";

import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";

export const Wrapper = styled.div`
  background:linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), ${({ backdrop }) => 
      backdrop ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop}')` : '#000' };
  background-size: cover;
  background-position: center;
  padding: 90px 10px;
  animation: animationMovieInfo 1s;
  min-height: 50vh;

  @keyframes animationMovieInfo{
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  margin: 0 auto;
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4.5px );
  -webkit-backdrop-filter: blur( 4.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );

  border-radius: 20px;
  .thumb {
    border-radius: 20px;
    width: 100%;
    max-width: 480px;
    transition: all .3s;
    object-fit: cover;
    /* border-radius: 20px 20px 0 0; */
    border-radius: 20px;
    animation: animatedThumb .5s;
    box-shadow: 0 2px 8px gray;
    /* height: 100%; */
    margin: 0;
  }

  .img-div {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    /* text-align: center; */
  }

  @media screen and (max-width: 768px){
    display: block;
    max-height: none;

    .img-div {
      width: 100%;
      text-align: center;
      max-width: 300px;
      margin-top: 30px;
    }
  }
  @media screen and (max-width: 500px){
    display: block;
    max-height: none;

    .img-div {
      width: 100%;
      text-align: center;
      max-width: 250px;
      margin-top: 30px;
    }
  }
`;

export const Text = styled.div`
  width: 100%;
  padding: 20px 15px;
  color: var(--white);
  overflow: hidden;
  white-space: pre-wrap;

  .MuiButton-startIcon {
    margin-right: 5px;
  }

  .rating-directors {
    display: flex;
    justify-content: flex-start;

    p {
      margin: 0;
    }

    h3 {
      margin-bottom: 0;
    }
  }

  .score {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background: var(--white);
    color: #000;
    font-weight: 800;
    border-radius: 50%;
    margin: 0;
  }

  .buttons {
    display: flex;
    align-items: center;
    width: 20%;
  }

  .list-button button{
    padding: 8px;
    font-size: .7rem;
  }

  .buttons a {
    margin-right: 12px;
  }

  .search{
    justify-content: start;
  }

  .director {
    margin: 0 0 0 40px;

    p{
      margin: 0;
    }
  }

  h1 {
    margin-bottom: 0;
    @media screen and (max-width: 768px){
      font-size: var(--fontBig);
    }
  }
  

`;
