import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './Grid.styles';

const Grid = ({ header, children, length, input }) => {

  return (
    <Wrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <h1>{header}<span>{length}</span></h1>
        {input}
      </div>
      <Content>{children}</Content>
    </Wrapper>
  )
}

Grid.propTypes = {
  header: PropTypes.string
}

export default Grid;
