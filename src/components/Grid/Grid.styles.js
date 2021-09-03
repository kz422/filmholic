import styled from "styled-components";

export const Wrapper = styled.div`
  /* max-width: var(--maxWidth); */
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;

  h1{
    color: var(--white);
    margin-top: 0;
    padding-top: 20px;

    @media screen and (max-width: 768px){
      font-size: var(--fontBig);
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-gap: 1rem;

  @media screen and (max-width: 768px){
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

  @media screen and (max-width: 600px){
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    }
`;
