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

  .container {
    color: var(--white);
    margin-top: 40px;
  }
  p {
    color: var(--white);
  }
  img {
    border-radius: 50%;
  }
  
`
