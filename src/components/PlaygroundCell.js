import React from 'react';
import { connect } from 'react-redux';
import { processMove } from '../features/game/gameSlice';
import { SYMBOL_CROSS, SYMBOL_ZERO } from '../constants';

const PlaygroundCell = ({i, j, value, processMove}) => {
  const renderCell = value => {
    switch (value) {
      case SYMBOL_CROSS:
        return <i className="massive blue close icon"></i>;
      case SYMBOL_ZERO:
        return <i className="massive orange dot circle icon"></i>;
      default:
        return <i className="massive question disabled icon"></i>;
    }
  }

  return (
    <div className="column">
      <div className="ui segment" onClick={() => processMove(i, j)}>
        {renderCell(value)}
      </div>
    </div>
  );
}

export default connect(null, { processMove })(PlaygroundCell);
