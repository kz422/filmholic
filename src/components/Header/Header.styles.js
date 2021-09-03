import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 0 20px;
  background-color: rgba(0,0, 0, 0);
  position: sticky;
`;

export const Bar = styled.div`
  color: var(--white);
  display: flex;
  justify-content: space-between;
  width: 100%;
  line-height: 100%;
  margin-top: 10px;
  
  button {
    color: var(--white);
    height: 70px;
  }

  h1 {
    color: var(--white);
    font-style: italic;
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
