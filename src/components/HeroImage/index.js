import React from 'react'
import PropTypes from 'prop-types';

import { Wrapper, Content, Text } from './HeroImage.styles'

import { GiLaurelCrown } from 'react-icons/gi'

const HeroImage = ({ image, title, text, num }) => (
  <Wrapper image={image}>
    <Content>
      <Text>
        <div  className="ribbon" style={{display:'flex', alignItems: 'center'}}>
          {/* <GiLaurelCrown className="icons" size="2rem" /> */}
          <h2> Hit Movie #{num}</h2>
        </div>
        <h1>{title}</h1>
        <p>{text}</p>
      </Text>
    </Content>
  </Wrapper>
);

HeroImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
}

export default HeroImage;
