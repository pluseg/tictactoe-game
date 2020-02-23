import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { makeMove } from '../features/game/gameSlice';
import PlaygroundCell from './PlaygroundCell';

const StyledPlayground = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.size}, 1fr)`};
  grid-auto-rows: 1fr;
  align-items: stretch;
  justify-items: stretch;
  margin-top: 20px;
`;

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
      <StyledPlayground size={this.props.size}>
        {this.renderCells()}
      </StyledPlayground>
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
