import styled from "styled-components";

export const Wrapper = styled.div`
  .nav {
    position: fixed;
    z-index: 999;
    width: 100%;
    transition-timing-function: ease-in;
    transition: all .5s;
  }
  .nav__black {
    background-color: rgba(0,0,0, .85);
  }
`;

export const Bar = styled.div`
  color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  line-height: 100%;
  margin-top: 10px;
  
  button {
    color: var(--white);
    height: 70px;
  }

  .icon {
    margin-top: 8px;
  }

  h2 {
    color: #ff6700;
    font-style: italic;
    font-weight: bolder;
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--maxWidth);
  padding: 20px 0;
  margin: 0 auto;
`;

export const LogoImg = styled.img`
  width: 200px;

  @media screen and (max-width: 500){
    width: 150px;
  }
`;

export const TMDBLogoImg = styled.img`
  width: 100px;

  @media screen and (max-width: 500px){
    width: 80px;
  }
`;
