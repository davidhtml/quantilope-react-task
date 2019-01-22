import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

class TableName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { tableName } = this.props;
    if (tableName !== prevProps.tableName) {
      // eslint-disable-next-line
      this.setState({
        value: tableName,
      });
    }
  }

  render() {
    const { handleSaveTableName } = this.props;
    const { value } = this.state;
    return (
      <h2>
        <DebounceInput
          type="text"
          id="table-name"
          value={value}
          onChange={e => {
            this.setState({
              value: e.target.value,
            });
            handleSaveTableName({
              debouncedValue: e.target.value,
            });
          }}
          debounceTimeout={500}
          placeholder="Enter table name"
        />
      </h2>
    );
  }
}

TableName.propTypes = {
  tableName: PropTypes.string.isRequired,
  handleSaveTableName: PropTypes.func.isRequired,
};

export default TableName;
