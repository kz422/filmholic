import React from 'react'
import PropTypes from 'prop-types';

import { Wrapper, Content, Text } from './HeroImage.styles'
import { Button } from '@material-ui/core';

const HeroImage = ({ image, title, text, num, id }) => {
  
  return (
    <Wrapper image={image}>
      <Content className="wrap">
        <Text className="text">
          <h3> HotMovie #{num}</h3>
          <h1>{title}</h1>
          <div className="overview">
            <p>{
            text.length > 150 ? text.slice(0, 150) + "..." : text
            }</p> 
          </div>
        <Button 
          variant="contained"
          color="primary"
          href={`/movie/${id}`}
          className="button"
          size="small"
        >
          詳しく
        </Button>
        </Text>
      </Content>
    </Wrapper>
  )
}

HeroImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
}

export default HeroImage;
