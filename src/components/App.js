import React from 'react';
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
        return <div><i className="asterisk loading icon"></i> Loading...</div>
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

const mapStateToProps = (state) => {
  return {step: state.game.step};
};

export default connect(mapStateToProps)(App);
