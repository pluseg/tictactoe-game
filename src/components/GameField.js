import React from 'react';
import { connect } from 'react-redux';
import { makeMove } from '../actions';
import { SYMBOL_CROSS, SYMBOL_ZERO } from '../actions/gameSteps';

class GameField extends React.Component {
  renderCell(value) {
    switch (value) {
      case SYMBOL_CROSS:
      return <i className="massive blue close icon"></i>;
      case SYMBOL_ZERO:
        return <i className="massive orange dot circle icon"></i>;
      default:
        return <i className="massive question disabled icon"></i>;
    }
  }

  renderCells() {
    return this.props.cells.map((row, i) => {
      const renderedRow = row.map((cell, j) => {
        const key = `${i}_${j}`;
        return (
          <div key={key} className="column">
            <div className="ui segment" onClick={() => this.props.makeMove(i, j)}>
              {this.renderCell(cell)}
            </div>
          </div>
        );
      });

      return <div key={i} className="row">{renderedRow}</div>;
    })
  }

  render() {
    return (
      <div className="ui three column grid" style={{textAlign: 'center'}}>
        {this.renderCells()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {cells: state.game.cells};
};

export default connect(mapStateToProps, { makeMove })(GameField);
