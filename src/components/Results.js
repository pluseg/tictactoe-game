import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  RESULT_TIE,
  RESULT_CROSS_WIN,
  RESULT_ZERO_WIN,
  RESULT_UNKNOWN,
} from '../constants';
import styled from 'styled-components';

const StyledResults = styled.div`
  background-color: aqua;
  border-radius: 10px;
  border: 15px solid rgba(255, 255, 255, 0.62);
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: -50%;
  padding: 10px 20px;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 5px;
`;

const Status = styled.p`
  font-size: 2em;
  font-weight: 800;
  padding: 0 0 15px 0;
`;

const Results = ({ result }) => {
  if (result === RESULT_UNKNOWN) {
    return null;
  }

  const renderStatus = () => {
    if (result === RESULT_TIE) {
      return "It's a TIE!";
    }
    if (result === RESULT_ZERO_WIN) {
      return 'O O O O O O win!';
    }
    if (result === RESULT_CROSS_WIN) {
      return 'X X X X X X win!';
    }

    return null;
  };

  return (
    <StyledResults>
      <Title>Game over</Title>
      <Status>{renderStatus()}</Status>
    </StyledResults>
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

const mapStateToProps = state => ({ result: state.game.result });

export default connect(mapStateToProps)(Results);
