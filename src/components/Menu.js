import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { startNewGame } from '../features/game/gameSlice';
import { STEP_WELCOME, STEP_GAME, STEP_RESULTS, SIZE } from '../constants';

const SizeInput = styled.input.attrs(props => ({
  type: 'text',
  placeholder: 'Size',
  width: props.width || '50px',
}))`
  width: ${props => props.width} !important;
`;

const Menu = ({ step, startNewGame }) => {
  const [size, setSize] = useState(SIZE);

  const renderStartButton = () => {
    // TODO: ask @sg about refactoring that.
    if (step === STEP_WELCOME || step === STEP_RESULTS) {
      return (
        <button
          className="positive ui button"
          onClick={() => startNewGame(size)}
        >
          Start
        </button>
      );
    }
  };

  const renderRestartButton = () => {
    if (step === STEP_GAME) {
      return (
        <button className="ui button" onClick={() => startNewGame(size)}>
          Restart
        </button>
      );
    }
  };

  return (
    <div className="ui action input">
      <SizeInput
        value={size}
        onChange={e => setSize(parseInt(e.target.value) || '')}
      />
      {renderStartButton()}
      {renderRestartButton()}
    </div>
  );
};

Menu.propTypes = {
  step: PropTypes.oneOf([STEP_WELCOME, STEP_GAME, STEP_RESULTS]).isRequired,
  startNewGame: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ step: state.game.step });

export default connect(
  mapStateToProps,
  { startNewGame },
)(Menu);
