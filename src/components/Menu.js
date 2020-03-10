import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { startNewGame } from '../features/game/gameSlice';
import { STEP_WELCOME, STEP_GAME, STEP_RESULTS, SIZE } from '../constants';

const StyledMenu = styled.div`
  margin: 0 0 15px 0;
`;

const SizeInput = styled.input.attrs(props => ({
  width: props.width || '50px',
}))`
  width: ${props => props.width} !important;
`;

const Menu = ({ step, startNewGameConnect }) => {
  const [size, setSize] = useState(SIZE);

  const renderStartButton = () => {
    if (![STEP_WELCOME, STEP_RESULTS].includes(step)) {
      return null;
    }

    return (
      <button
        type="button"
        className="positive ui button"
        onClick={() => startNewGameConnect(size)}
      >
        Start
      </button>
    );
  };

  const renderRestartButton = () => {
    if (step !== STEP_GAME) {
      return null;
    }

    return (
      <button
        type="button"
        className="ui button"
        onClick={() => startNewGameConnect(size)}
      >
        Restart
      </button>
    );
  };

  return (
    <StyledMenu>
      <div className="ui action input">
        <SizeInput
          value={size}
          onChange={e => setSize(parseInt(e.target.value, 10) || '')}
          type="text"
          placeholder="Size"
        />
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
