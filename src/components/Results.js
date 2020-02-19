import React from 'react';
import { connect } from 'react-redux';
import { RESULT_TIE, RESULT_CROSS_WIN, RESULT_ZERO_WIN, RESULT_UNKNOWN } from '../constants';

const Results = props => {
  if (props.result === RESULT_UNKNOWN) {
    return null;
  }

  const renderStatus = () => {
    if (props.result === RESULT_TIE) {
      return `It's a TIE!`;
    } else if (props.result === RESULT_ZERO_WIN) {
      return 'ZEROs win!';
    } else if (props.result === RESULT_CROSS_WIN) {
      return 'CROSSes win!';
    }
  };

  return (
    <div>
      <h2>Game over! {renderStatus()}</h2>
    </div>
  );
};

const mapStateToProps = state => {
  return {result: state.game.result};
};

export default connect(mapStateToProps)(Results);
