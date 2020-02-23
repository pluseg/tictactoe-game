import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Playground from './Playground';
import Welcome from './Welcome';
import Menu from './Menu';
import Results from './Results';
import { STEP_WELCOME, STEP_GAME, STEP_RESULTS } from '../constants';

class App extends React.Component {
  renderCurrentStep() {
    switch (this.props.step) {
      case STEP_WELCOME:
        return <Welcome />;
      case STEP_GAME:
      case STEP_RESULTS:
        return <Playground />;
      default:
        return (
          <div>
            <i className="asterisk loading icon" /> Loading...
          </div>
        );
    }
  }

  render() {
    return (
      <div className="ui container">
        <h1>Tic Tac Toe Game</h1>
        <div className="ui grid">
          <div className="two wide column">
            <Menu />
          </div>
          <div className="fourteen wide column">
            <Results />
          </div>
        </div>
        {this.renderCurrentStep()}
      </div>
    );
  }
}

App.propTypes = {
  step: PropTypes.oneOf([STEP_WELCOME, STEP_GAME, STEP_RESULTS]).isRequired,
};

const mapStateToProps = state => ({ step: state.game.step });

export default connect(mapStateToProps)(App);
