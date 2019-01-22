import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class Column extends Component {
  handleChange = e => {
    e.persist();
    const { handleChangeLabel, column } = this.props;
    const obj = Object.assign({}, column);
    obj.label = e.target.value;
    handleChangeLabel({ columns: obj, event: e });
  };

  onHandleSave = e => {
    e.persist();
    if (e.key === 'Enter' || e.key === 'Tab') {
      const { handleLabelSave, column } = this.props;
      const obj = Object.assign({}, column);
      obj.label = e.target.value;
      handleLabelSave({ columns: obj });
    }
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
        <input
          type="text"
          value={column.label}
          onChange={this.handleChange}
          placeholder="add.."
          onKeyDown={this.onHandleSave}
        />
      </div>
    );
  }
}

Column.propTypes = {
  handleChangeLabel: PropTypes.func.isRequired,
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
