import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SYMBOL_CROSS, SYMBOL_ZERO, NO_SYMBOL } from '../constants';

const StyledPlaygroundCell = styled.div`
  cursor: pointer;
  flex: ${props => `${props.width}%`};
  text-align: center;
  padding: 10px;
  width: ${props => `${props.width}%`};
`;

const SymbolImage = styled.img`
  width: 100%;
  max-width: 100%;
`;

const PlaygroundCell = ({ value, onClick, width }) => {
  const renderCell = symbol => {
    switch (symbol) {
      case SYMBOL_CROSS:
        return <SymbolImage src="/img/cross.svg" />;
      case SYMBOL_ZERO:
        return <SymbolImage src="/img/zero.svg" />;
      default:
        return <SymbolImage src="/img/empty.svg" />;
    }
  };

  return (
    <StyledPlaygroundCell onClick={onClick} width={width}>
      {renderCell(value)}
    </StyledPlaygroundCell>
  );
};

PlaygroundCell.propTypes = {
  value: PropTypes.oneOf([NO_SYMBOL, SYMBOL_ZERO, SYMBOL_CROSS]),
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number,
};

export default PlaygroundCell;
