import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;400;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700&display=swap');

  :root{
    --maxWidth: 1280px;
    --white: #fff;
    --lightGrey: #eee;
    --medGrey: #353535;
    --darkGrey: #1c1c1c;
    --fontSuperBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
    --fontXSmall: .8rem;
  }

  *{
    box-sizing: border-box;
    font-family: 'Oswald', 'M PLUS 1p', sans-serif;
  }

  a {
    text-decoration: none;
  }

  body{
    margin: 0;
    padding: 0;
    background: #1c1c1c;

  h1{
    font-size: 2rem;
    font-weight: 600;
    color: var(--white);
  }

  h3{
    font-size: 1.1rem;
    font-weight:600;
  }

  p{
    font-size: 1rem;
    color: var(--white);
  }

  .cast-title {
    color: var(--white);
    margin-left: 16px;
  }

  .footer-container {
    position: absolute;
    bottom: 0;
  }
}
`;
