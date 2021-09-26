import styled from "styled-components";

export const Wrapper = styled.div`
  background: linear-gradient(
    to bottom, 
    rgba(0, 0, 0, 0) 41%, 
    rgba(0, 0, 0, 0.65) 100%
  ),
    var(--darkGrey), no-repeat;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  height: 800px;
  position: relative;
  animation: alternateHeroImage 1s;

  @media screen and (max-width: 768px){
    height: 450px;
    }

  @keyframes animateHeroImage{
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }
`;

export const Content = styled.div`
  padding: 20px;
  max-width: var(--maxWidth);
  margin: 0 auto;
`;

export const Text = styled.div`
  z-index: 100;
  padding: 10px;
  max-width: 700px;
  position: absolute;
  bottom: 20px;
  margin-right: 40px;
  min-height: 100px;
  color: var(--white);
  max-height: 300px;
  background: rgba(0, 0, 0, .2);
  border-radius: 10px;

  h1{
    font-size: var(--fontSuperBig);
    margin-top: 0px;
    margin-bottom: 0;
    padding-bottom: 0;

    @media screen and (max-width: 720px){
      font-size: var(--fontBig);
    }
  }

  .overview p{
    font-size: var(--fontXSmall);
    word-wrap: break-word;
  }
  
  h3 {
    /* font-family: 'Futura'; */
    font-style: italic;
    font-size: 1.8rem;
    margin: 0;
    color: red;
  }

  .icons {
    margin: 8px;
  }

  .button {
    margin-top: 6px;
  }

  p{
    font-size: var(--fontXSmall);
    font-weight: lighter;
    margin: 0;
    overflow: hidden;

    @media screen and (max-width: 720px){
      font-size: var(--fontXSmall);
    }
  }

  @media screen and (max-width: 720px){
    max-width: 100%;
  }
`;
