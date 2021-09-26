import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Image } from './Actor.styles';

const Actor = ({ name, character, imageUrl }) => (
  <Wrapper>
    <Image src={imageUrl} alt='actor-thumb' />
    <p className="actor-name">{name}</p>
    {character ? 
      <p>{character} 役</p>
      : null
    }
  </Wrapper>
)
Actor.propTypes = {
  name: PropTypes.string,
  character: PropTypes.string,
  imageUrl: PropTypes.string
}

export default Actor;
