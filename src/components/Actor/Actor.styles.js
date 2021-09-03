import styled from "styled-components";

export const Wrapper = styled.div`
  color: var(--white);
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4.5px );
  -webkit-backdrop-filter: blur( 4.5px );
  border-radius: 15px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  /* padding: 5px; */
  text-align: center;
  margin: 6px;
  transition: all .3s;
  width: 200px;
  font-weight: lighter;
  

  :hover{
    transform: scale(1.02);
  }
  
  h3 {
    margin: 10px 0 0 0;
  }

  p {
    margin: 5px 0;
    font-size: small;
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
`;
