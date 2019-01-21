import React from 'react';
import PropTypes from 'prop-types';

const Summary = props => {
  const { rows, columns, numberOfImages, longestLabel } = props;
  return (
    <div className="summary">
      <h2>Summary</h2>
      <p>Number of rows: {rows.length}</p>
      <p>Number of columns: {columns.length}</p>
      <p>Number of images: {numberOfImages().length}</p>
      <p>Longest label in rows: {longestLabel().row.label.length}</p>
      <p>Longest label in cols: {longestLabel().col.label.length}</p>
    </div>
  );
};

Summary.propTypes = {
  numberOfImages: PropTypes.func.isRequired,
  longestLabel: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Summary;
