import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../history';
import Playground from './Playground';
import Welcome from './Welcome';
import Menu from './Menu';
import Results from './Results';
import { STEP_WELCOME, STEP_GAME, STEP_RESULTS } from '../constants';

class App extends React.Component {
  componentDidMount() {
    const { step } = this.props;
    if (step === STEP_WELCOME) {
      history.push('/');
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="ui container">
          <h1>Tic Tac Toe Game</h1>
          <div className="ui grid">
            <div className="four wide column">
              <Menu />
            </div>
          </div>
          <Switch>
            <Route path="/game">
              <Playground />
            </Route>
            <Route path="/results">
              <Results />
              <Playground />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  step: PropTypes.oneOf([STEP_WELCOME, STEP_GAME, STEP_RESULTS]).isRequired,
};

const mapStateToProps = (state) => ({ step: state.game.step });

export default connect(mapStateToProps)(App);
