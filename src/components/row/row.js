import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DebounceInput } from 'react-debounce-input';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    const { row } = this.props;
    this.setState({
      value: row.label,
    });
  }

  componentDidUpdate(prevProps) {
    const { row } = this.props;
    if (row !== prevProps.row) {
      // eslint-disable-next-line
      this.setState({
        value: row.label,
      });
    }
  }

  onLabelSave = debouncedVal => {
    const { handleLabelSave, row } = this.props;
    const obj = Object.assign({}, row, debouncedVal);
    handleLabelSave({ rows: obj });
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
    const { value } = this.state;

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
        {col.map((item, i) => (
          <input
            key={i}
            type="radio"
            value={`row${i}col${i}`}
            checked={checkedRadio === `row${i}col${i}`}
            onChange={this.onRadioChange}
            className="radio-input"
          />
        ))}
      </div>
    );
  }
}

Row.propTypes = {
  handeChangeImage: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleCheckedRadio: PropTypes.func.isRequired,
  handleLabelSave: PropTypes.func.isRequired,
  columnsLength: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkedRadio: PropTypes.string.isRequired,
  row: PropTypes.shape({
    label: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Row;
