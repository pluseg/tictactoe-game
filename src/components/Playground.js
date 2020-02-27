import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { makeMove } from '../features/game/gameSlice';
import PlaygroundCell from './PlaygroundCell';

const StyledPlayground = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.size}, 1fr)`};
  grid-auto-rows: 1fr;
  align-items: stretch;
  justify-items: stretch;
  margin-top: 20px;
`;

class Playground extends React.Component {
  renderCells() {
    const { cells, makeMoveConnect } = this.props;
    return cells.map((row, i) => row.map((cell, j) => (
      <PlaygroundCell
          // eslint-disable-next-line react/no-array-index-key
        key={`${i}_${j}`}
        value={cell}
        onClick={() => makeMoveConnect(i, j)}
      />
    )));
  }

  render() {
    const { size } = this.props;
    return (
      <StyledPlayground size={size}>{this.renderCells()}</StyledPlayground>
    );
  }
}

Playground.propTypes = {
  size: PropTypes.number.isRequired,
  cells: PropTypes.arrayOf(PropTypes.array),
  makeMoveConnect: PropTypes.func.isRequired,
};

Playground.defaultProps = {
  cells: [[]],
};

const mapStateToProps = (state) => ({
  cells: state.game.cells,
  size: state.game.size,
});

export default connect(
  mapStateToProps,
  { makeMoveConnect: makeMove },
)(Playground);
