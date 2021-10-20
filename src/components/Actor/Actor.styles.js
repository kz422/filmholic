import styled from "styled-components";

export const Wrapper = styled.div`
  color: var(--white);
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4.5px );
  -webkit-backdrop-filter: blur( 4.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  /* padding: 5px; */
  text-align: center;
  /* box-shadow: 0 1px 2px gray; */
  transition: all .3s;
  min-width: 140px;
  max-width: 140px;
  font-weight: lighter;
  margin-bottom: 3px;
  

  :hover{
    transform: scale(1.02);
  }
  
  .actor-name {
    margin: 0;
    font-weight: 400;
  }

  p {
    margin: 0;
    font-size: small;
    padding-bottom: 2px;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 300px;
  transition: all .3s;
  object-fit: cover;
  /* border-radius: 20px 20px 0 0; */
  border-radius: 10px 10px 0 0;
  animation: animatedThumb .5s;
  /* height: 100%; */
  margin: 0;
`;
