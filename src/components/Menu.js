import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { startNewGame } from '../features/game/gameSlice';
import { STEP_WELCOME, STEP_GAME, STEP_RESULTS, SIZE } from '../constants';

const StyledMenu = styled.div`
  margin: 0 0 15px 0;
`;

const SizeSelect = styled.select`
  margin: 0 10px 0 0;
`;

const Menu = ({ step, startNewGameConnect }) => {
  const [size, setSize] = useState(SIZE);

  const renderStartButton = () => {
    if (![STEP_WELCOME, STEP_RESULTS].includes(step)) {
      return null;
    }

    return (
      <div
        className="positive ui button"
        onClick={() => startNewGameConnect(size)}
      >
        Start
      </div>
    );
  };

  const renderRestartButton = () => {
    if (step !== STEP_GAME) {
      return null;
    }

    return (
      <div className="ui button" onClick={() => startNewGameConnect(size)}>
        Restart
      </div>
    );
  };

  return (
    <StyledMenu>
      <div className="ui input">
        <SizeSelect
          className="ui compact selection dropdown"
          onChange={e => setSize(parseInt(e.target.value, 10) || SIZE)}
        >
          <option selected={size === 3} value="3">
            3 x 3 (3 in row)
          </option>
          <option selected={size === 15} value="15">
            15 x 15 (5 in row)
          </option>
          <option selected={size === 19} value="19">
            19 x 19 (5 in row)
          </option>
        </SizeSelect>
        {renderStartButton()}
        {renderRestartButton()}
      </div>
    </StyledMenu>
  );
};

Menu.propTypes = {
  step: PropTypes.oneOf([STEP_WELCOME, STEP_GAME, STEP_RESULTS]).isRequired,
  startNewGameConnect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ step: state.game.step });

export default connect(mapStateToProps, { startNewGameConnect: startNewGame })(
  Menu,
);
