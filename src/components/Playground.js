import React from 'react';
import { connect } from 'react-redux';
import PlaygroundCell from './PlaygroundCell';

class Playground extends React.Component {
  renderCells() {
    return this.props.cells.map((row, i) => {
      const renderedRow = row.map((cell, j) => {
        return <PlaygroundCell i={i} j={j} value={cell} />;
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

export default connect(mapStateToProps)(Playground);
