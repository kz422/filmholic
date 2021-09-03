import React from 'react';
import PropTypes from 'prop-types';

import { calcTime, convertMoney } from '../../helpers';

import { Wrapper, Content } from './MovieInfoBar.styles';

const MovieInfoBar = ({ time, budget, revenue }) => (
  <Wrapper>
    <Content>
      <div className="column">
        <p>上映時間 : {calcTime(time)}</p>
      </div>
      <div className="column">
        <p>総製作費 : {convertMoney(budget)}</p>
      </div>
      <div className="column">
        <p>興行収入 : {convertMoney(revenue)}</p>
      </div>
    </Content>
  </Wrapper>
)

MovieInfoBar.propTypes = {
  time: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number
}

export default MovieInfoBar;
