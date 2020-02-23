import React from 'react';
import { connect } from 'react-redux';
import { startNewGame } from '../features/game/gameSlice';
import { STEP_WELCOME, STEP_GAME, STEP_RESULTS } from '../constants';

const Menu = (props) => {
  const renderStartButton = () => {
    // TODO: ask @sg about refactoring that.
    if (props.step === STEP_WELCOME || props.step === STEP_RESULTS) {
      return (
        <button
          className="positive ui button"
          onClick={() => props.startNewGame()}
        >
          Start
        </button>
      );
    }
  };

  const renderResetButton = () => {
    if (props.step === STEP_GAME) {
      return (
        <button className="ui button" onClick={() => props.startNewGame()}>
          Reset
        </button>
      );
    }
  };

  return (
    <div>
      {renderStartButton()}
      {renderResetButton()}
    </div>
  );
};

const mapStateToProps = (state) => ({ step: state.game.step });

export default connect(mapStateToProps, { startNewGame })(Menu);
