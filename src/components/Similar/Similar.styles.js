import styled from "styled-components";

export const Wrapper = styled.div`
  /* width: 100%; */
  /* margin-left: 30px; */
  margin-top: 30px;

  img {
    max-width: 200px;
    padding: 12px;
    border-radius: 20px;
  }

  h3 {
    margin-left: 20px;
    margin-bottom: 0;
    color: var(--white);
  }
`
export const Content = styled.div`
  display: flex;
  width: 100%;
  /* max-width: var(--maxWidth); */
  overflow: scroll;
  padding: 12px;

  img {
    max-width: 200px;
    padding: 12px;
    border-radius: 20px;
  }

  h3 {
    margin: 10px 0 0 0;
  }
`
