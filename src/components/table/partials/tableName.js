import React from 'react';
import PropTypes from 'prop-types';

const TableName = props => {
  const { tableName, onTableName } = props;
  return (
    <h2>
      <input
        type="text"
        id="table-name"
        value={tableName}
        onChange={onTableName}
        placeholder="Enter table name"
      />
    </h2>
  );
};

TableName.propTypes = {
  tableName: PropTypes.string.isRequired,
  onTableName: PropTypes.func.isRequired,
};

export default TableName;
