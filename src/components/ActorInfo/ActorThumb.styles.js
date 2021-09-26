import styled from "styled-components";

export const Card = styled.div`
	position: relative;
  transition: all .3s;

  :hover{
      transform: scale(1.05);
    }

  p {
    position: absolute;
    bottom: 5px;
    left: 5%;
    font-size: small;
    font-weight: lighter;
  }
`

export const Image = styled.img`
  width: 100%;
  max-width: 500px;
  transition: all .3s;
  object-fit: cover;
  /* border-radius: 20px 20px 0 0; */
  border-radius: 20px;
  animation: animatedThumb .5s;
  box-shadow: 0 2px 8px gray;
  /* height: 100%; */
  margin: 0;

  .thumb {
    :hover{
      transform: scale(1.05);
    }
  }

  @keyframes animatedThumb {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }
`;
