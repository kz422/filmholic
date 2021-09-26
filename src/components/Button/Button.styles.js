import styled from "styled-components";

export const Wrapper = styled.button`
  background-color: #ff6700;
  display: block;
  width: 8%;
  min-width: 150px;
  height: 40px;
  border-radius: 30px;
  color: var(--white);
  border: 0;
  font-size: var(--fontXSmall);
  margin: 20px auto;
  transition: all .3s;
  outline: none;
  cursor: pointer;

  :hover{
    opacity: .8;
  }
`
