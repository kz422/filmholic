import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Image } from './Actor.styles';

const Actor = ({ name, character, imageUrl }) => (
  <Wrapper>
    <Image src={imageUrl} alt='actor-thumb' />
    <p className="actor-name">{name.length > 12 ? 
        name.slice(0 , 11) + "..."
        : name
      }
    </p>
    {character ? 
      <p>{character.length > 13 ? 
        character.slice(0 , 12) + "..."
        : character
      } 役</p>
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
