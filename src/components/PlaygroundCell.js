import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SYMBOL_CROSS, SYMBOL_ZERO, NO_SYMBOL } from '../constants';

const StyledPlaygroundCell = styled.div`
  cursor: pointer;
  text-align: center;
  border: 1px #ddd solid;
  padding: 10px;
`;

const PlaygroundCell = ({ value, onClick }) => {
  const renderCell = (symbol) => {
    switch (symbol) {
      case SYMBOL_CROSS:
        return <i className="massive blue close icon" />;
      case SYMBOL_ZERO:
        return <i className="massive orange dot circle icon" />;
      default:
        return <i className="massive question disabled icon" />;
    }
  };

  return (
    <StyledPlaygroundCell onClick={onClick}>
      {renderCell(value)}
    </StyledPlaygroundCell>
  );
};

PlaygroundCell.propTypes = {
  value: PropTypes.oneOf([NO_SYMBOL, SYMBOL_ZERO, SYMBOL_CROSS]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlaygroundCell;
