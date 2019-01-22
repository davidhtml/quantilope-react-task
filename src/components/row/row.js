import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class Row extends Component {
  onLabelChange = e => {
    e.persist();
    const { handleChangeLabel, row } = this.props;
    const obj = Object.assign({}, row);
    obj.label = e.target.value;
    handleChangeLabel({ rows: obj });
  };

  onHandleSave = e => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      const { handleLabelSave, row } = this.props;
      const obj = Object.assign({}, row);
      obj.label = e.target.value;
      handleLabelSave({ rows: obj });
    }
  };

  onImageChange = e => {
    const { handeChangeImage, row } = this.props;
    if (e.target.files[0]) {
      const files = Array.from(e.target.files);
      return handeChangeImage({ rows: row, file: files[0] });
    }
    return null;
  };

  onRemveRow = () => {
    const { handleRemove, row } = this.props;
    handleRemove({ rows: row });
  };

  onRadioChange = e => {
    e.persist();
    const { handleCheckedRadio, row } = this.props;
    const obj = Object.assign({}, row);
    obj.checked = e.target.value;
    handleCheckedRadio(obj);
  };

  render() {
    const { row, columnsLength: col, checkedRadio } = this.props;
    return (
      <div className="row">
        <div className="options">
          <input type="submit" value="X" onClick={this.onRemveRow} />
          <label htmlFor="plus">
            <FontAwesomeIcon icon={faPlus} />
            <input
              onChange={this.onImageChange}
              accept="image/png, image/jpeg"
              type="file"
              id="plus"
            />
            {row.image ? <div className="img-uploaded" /> : null}
          </label>
          <input
            type="text"
            value={row.label}
            onChange={this.onLabelChange}
            placeholder="add.."
            onKeyDown={this.onHandleSave}
          />
        </div>
        {col.map((item, i) => (
          <input
            key={i}
            type="radio"
            value={`row${row._id}col${item._id}`}
            checked={checkedRadio === `row${row._id}col${item._id}`}
            onChange={this.onRadioChange}
            className="radio-input"
          />
        ))}
      </div>
    );
  }
}

Row.propTypes = {
  handleChangeLabel: PropTypes.func.isRequired,
  handeChangeImage: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleCheckedRadio: PropTypes.func.isRequired,
  handleLabelSave: PropTypes.func.isRequired,
  columnsLength: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkedRadio: PropTypes.string.isRequired,
  row: PropTypes.shape({
    label: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.shape({}),
  }).isRequired,
};

export default Row;
