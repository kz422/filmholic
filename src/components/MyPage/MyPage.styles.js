import styled from "styled-components";

export const Wrapper = styled.div`
  width: auto;
  height: 500px;
  padding-top: 100px;
  text-align: center;
  background:linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), ${({ backdrop }) => 
      backdrop ? `url('${backdrop}')` : '#000' };
  background-size: cover;
  background-position: center;
  padding: 120px 10px;

  @media screen and (max-width: 480px){
    height: 400px;
  }

  .buttons {
    margin-bottom: 10px;
    color: var(--white);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .button {
    color: var(--white);
    margin: 5px;
  }

  .container {
    max-width: 400px;
    color: var(--white);
    text-align: center;
    margin: 0 auto;
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4.5px );
    -webkit-backdrop-filter: blur( 4.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    border-radius: 20px;

    padding: 20px;
  }
  p {
    color: var(--white);
  }
  img {
    border-radius: 50%;
  }
  
`
