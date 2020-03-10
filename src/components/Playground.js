import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { makeMove } from '../features/game/gameSlice';
import PlaygroundCell from './PlaygroundCell';

const StyledPlayground = styled.div`
  width: 70vw;
  height: 70vw;
  min-width: 300px;
  min-height: 300px;
  max-width: calc(100vh - 110px);
  max-height: calc(100vh - 110px);
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
`;

class Playground extends React.Component {
  renderCells() {
    const { size, cells, makeMoveConnect } = this.props;
    const cellWidth = 100 / size;

    return cells.map((row, i) =>
      row.map((cell, j) => (
        <PlaygroundCell
          // eslint-disable-next-line react/no-array-index-key
          key={`${i}_${j}`}
          value={cell}
          width={cellWidth}
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
