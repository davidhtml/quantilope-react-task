import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DebounceInput } from 'react-debounce-input';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    const { column } = this.props;
    this.setState({
      value: column.label,
    });
  }

  componentDidUpdate(prevProps) {
    const { column } = this.props;
    if (column !== prevProps.column) {
      // eslint-disable-next-line
      this.setState({
        value: column.label,
      });
    }
  }

  onLabelSave = debouncedVal => {
    const { handleLabelSave, column } = this.props;
    const obj = Object.assign({}, column, debouncedVal);
    handleLabelSave({ columns: obj });
  };

  handleImage = e => {
    const { handeChangeImage, column } = this.props;
    if (e.target.files[0]) {
      const files = Array.from(e.target.files);
      return handeChangeImage({ columns: column, file: files[0] });
    }
    return null;
  };

  onRemveColumn = () => {
    const { handleRemove, column } = this.props;
    handleRemove({ columns: column });
  };

  render() {
    const { column } = this.props;
    const { value } = this.state;
    return (
      <div className="column">
        <input type="submit" value="X" onClick={this.onRemveColumn} />
        <label htmlFor="plus">
          <FontAwesomeIcon icon={faPlus} />
          <input
            onChange={this.handleImage}
            accept="image/png, image/jpeg"
            type="file"
            id="plus"
          />
          {column.image ? <div className="img-uploaded" /> : null}
        </label>
        <DebounceInput
          type="text"
          value={value}
          placeholder="add.."
          onChange={e => {
            this.setState({
              value: e.target.value,
            });
            this.onLabelSave({ label: e.target.value });
          }}
          debounceTimeout={500}
        />
      </div>
    );
  }
}

Column.propTypes = {
  handeChangeImage: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleLabelSave: PropTypes.func.isRequired,
  column: PropTypes.shape({
    label: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.shape({}),
  }).isRequired,
};

export default Column;
