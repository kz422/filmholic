import styled from "styled-components";

export const Wrapper = styled.div`
  .footer-container {
    background-color: gray;
    width: 100%;
    position: absolute;
    bottom: auto;
    /* min-height: 100px; */
    z-index: -10
  }

  @media screen and (max-width: 768px){
    .footer-container {
      background-color: gray;
      width: 100%;
      position: absolute;
      bottom: auto;
      min-height: 90px;
      z-index: -10
    }
  }

  .lists {
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding-left: 0;
  }

  .lists a {
    color: var(--black);
  }

  .copyright {
    font-weight: lighter;
    font-size: smaller;
    text-align: center;
    margin-bottom: 10px;
  }
`;
