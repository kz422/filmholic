import logo from '../../images/logo.png'
import { Wrapper } from "./Footer.styles";

import { Link } from 'react-router-dom';

const Footer = () => {
  
  return (
    <Wrapper>
      <div className="footer-container">
        <ul className="lists">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/">
            <li>Aout</li>
          </Link>
          <Link to="/">
            <li>Terms&Conditions</li>
          </Link>
          <Link to="/">
            <li>Contact</li>
          </Link>
        </ul>
        <div className="copyright">Copyright 2021 - PINO</div>
      </div>
    </Wrapper>
  );
}

export default Footer
