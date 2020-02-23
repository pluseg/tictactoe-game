import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeMove } from '../features/game/gameSlice';
import PlaygroundCell from './PlaygroundCell';

class Playground extends React.Component {
  renderCells() {
    return this.props.cells.map((row, i) =>
      row.map((cell, j) => (
        <PlaygroundCell
          key={`${i}_${j}`}
          value={cell}
          onClick={() => this.props.makeMove(i, j)}
        />
      )),
    );
  }

  render() {
    return (
      <div
        className="playground"
        style={{ gridTemplateColumns: `repeat(${this.props.size}, 1fr)` }}
      >
        {this.renderCells()}
      </div>
    );
  }
}

Playground.propTypes = {
  size: PropTypes.number.isRequired,
  cells: PropTypes.arrayOf(PropTypes.array),
  makeMove: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cells: state.game.cells,
  size: state.game.size,
});

export default connect(
  mapStateToProps,
  { makeMove },
)(Playground);
