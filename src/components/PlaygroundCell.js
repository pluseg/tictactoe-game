import React from 'react';
import { SYMBOL_CROSS, SYMBOL_ZERO } from '../constants';

const PlaygroundCell = ({ value, onClick }) => {
  const renderCell = (value) => {
    switch (value) {
      case SYMBOL_CROSS:
        return <i className="massive blue close icon" />;
      case SYMBOL_ZERO:
        return <i className="massive orange dot circle icon" />;
      default:
        return <i className="massive question disabled icon" />;
    }
  };

  return (
    <div className="playground-cell" onClick={onClick}>
      {renderCell(value)}
    </div>
  );
};

export default PlaygroundCell;
