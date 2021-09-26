import styled from "styled-components";

export const Card = styled.div`
	max-width: 100%;
	justify-content: center;
  background-color: gray;
  border-radius: 20px;
  color: var(--white);
  height: 100%;
  overflow: hidden;

  .left-section {
    margin: 0 0 0 16px;
  }

  h3{
    margin: 0;
    /* white-space: nowrap; */
  }

  .detail {
    height: 50px;
    display: flex;
    justify-content: space-between;
  }

  .rating {
    margin: 0 8px;
    width: 35px;
    min-width: 35px;
    margin-top: 6px;
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
