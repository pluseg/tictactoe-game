import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  RESULT_TIE,
  RESULT_CROSS_WIN,
  RESULT_ZERO_WIN,
  RESULT_UNKNOWN,
} from '../constants';

const Results = ({ result }) => {
  if (result === RESULT_UNKNOWN) {
    return null;
  }

  const renderStatus = () => {
    if (result === RESULT_TIE) {
      return "It's a TIE!";
    }
    if (result === RESULT_ZERO_WIN) {
      return 'ZEROs win!';
    }
    if (result === RESULT_CROSS_WIN) {
      return 'CROSSes win!';
    }

    return null;
  };

  return (
    <div>
      <h2>
        Game over!
        {renderStatus()}
      </h2>
    </div>
  );
};

Results.propTypes = {
  result: PropTypes.oneOf([
    RESULT_TIE,
    RESULT_CROSS_WIN,
    RESULT_ZERO_WIN,
    RESULT_UNKNOWN,
  ]).isRequired,
};

const mapStateToProps = (state) => ({ result: state.game.result });

export default connect(mapStateToProps)(Results);
