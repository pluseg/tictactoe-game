import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { makeMove } from '../features/game/gameSlice';
import PlaygroundCell from './PlaygroundCell';

const StyledPlayground = styled.div`
  width: 100%;
  margin: 20px auto 0;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Playground extends React.Component {
  renderCells() {
    const { size, cells, makeMoveConnect } = this.props;
    const width = 100 / size;

    return cells.map((row, i) =>
      row.map((cell, j) => (
        <PlaygroundCell
          // eslint-disable-next-line react/no-array-index-key
          key={`${i}_${j}`}
          value={cell}
          width={width}
          onClick={() => makeMoveConnect(i, j)}
        />
      )),
    );
  }

  render() {
    return (
      <StyledPlayground>
        <Container>{this.renderCells()}</Container>
      </StyledPlayground>
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

const mapStateToProps = state => ({
  cells: state.game.cells,
  size: state.game.size,
});

export default connect(mapStateToProps, { makeMoveConnect: makeMove })(
  Playground,
);
