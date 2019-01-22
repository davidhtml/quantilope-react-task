import React from 'react';
import PropTypes from 'prop-types';

const TableName = props => {
  const { tableName, onTableName, onSaveTableName } = props;
  return (
    <h2>
      <input
        type="text"
        id="table-name"
        value={tableName}
        onKeyDown={onSaveTableName}
        onChange={onTableName}
        placeholder="Enter table name"
      />
    </h2>
  );
};

TableName.propTypes = {
  tableName: PropTypes.string.isRequired,
  onTableName: PropTypes.func.isRequired,
  onSaveTableName: PropTypes.func.isRequired,
};

export default TableName;
