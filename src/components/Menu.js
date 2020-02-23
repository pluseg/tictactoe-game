import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startNewGame } from '../features/game/gameSlice';
import { STEP_WELCOME, STEP_GAME, STEP_RESULTS, SIZE } from '../constants';

class Menu extends React.Component {
  state = { size: SIZE };

  renderStartButton() {
    // TODO: ask @sg about refactoring that.
    if (this.props.step === STEP_WELCOME || this.props.step === STEP_RESULTS) {
      return (
        <button
          className="positive ui button"
          onClick={() => this.props.startNewGame(this.state.size)}
        >
          Start
        </button>
      );
    }
  }

  renderRestartButton() {
    if (this.props.step === STEP_GAME) {
      return (
        <button
          className="ui button"
          onClick={() => this.props.startNewGame(this.state.size)}
        >
          Restart
        </button>
      );
    }
  }

  render() {
    return (
      <div className="ui action input">
        <input
          className="game-size"
          type="text"
          placeholder="Size"
          value={this.state.size}
          onChange={e =>
            this.setState({ size: parseInt(e.target.value) || '' })
          }
        />
        {this.renderStartButton()}
        {this.renderRestartButton()}
      </div>
    );
  }
}

Menu.propTypes = {
  step: PropTypes.oneOf([STEP_WELCOME, STEP_GAME, STEP_RESULTS]).isRequired,
  startNewGame: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ step: state.game.step });

export default connect(
  mapStateToProps,
  { startNewGame },
)(Menu);
