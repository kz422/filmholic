import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 10px;
  max-width: 720px;
  margin: 0 auto;
`

export const Content = styled.div`
  position: relative;
  max-width: var(--maxWidth);
  width: 100%;
  height: 55px;
  background: gray;
  margin: 0 auto;
  border-radius: 40px;
  color: var(--white);

  @media screen and (max-width: 768px) {
    width: 80%;
    height: 40px;
  }

  img {
    position: absolute;
    left: 19px;
    top: 19px;
    width: 20px;

    @media screen and (max-width: 768px){
      top: 10px;
    }
  }
  
  input{
    font-size: 18px;
    position: absolute;
    left: 0;
    margin: 8px 0;
    padding: 0 0 0 50px;
    border: 0;
    width: 95%;
    background-color: transparent;
    height: 40px;
    color: var(--white);

    @media screen and (max-width: 768px) {
      margin: 0;
    }

    :focus{
      outline: none;
    }

  ::placeholder{
    color: var(--white);
    }
  }
`
