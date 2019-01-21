import React, { Component } from 'react';

import {
  patchTableName,
  getAll,
  postNew,
  deleteOne,
  updateOne,
  uploadImage,
} from '../../http/http';
import { endpoint } from '../../http/endpoints';
import { findNoOfImages, findLongestLabel } from '../summary/utils';
import { checkIfRow } from '../utils';
import Row from '../row/row';
import Column from '../column/column';
import Summary from '../summary/summary';
import TableName from './partials/tableName';
import AddNew from './partials/addNew';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      columns: [],
      tableName: [{ tableName: '' }],
    };
  }

  componentDidMount() {
    const { urlGetAll } = endpoint;
    getAll(urlGetAll)
      .then(table => {
        this.setState(prev => ({
          rows: [...prev.rows, ...table.rows],
          columns: [...prev.columns, ...table.columns],
          tableName: [...table.tableName],
        }));
      })
      .catch(err => {
        throw new Error('error happened while fetching all table', err);
      });
  }

  onTableName = async e => {
    e.persist();
    const name = e.target.value;
    const { urlPacthTableName } = endpoint;
    const { tableName } = this.state;
    const response = await patchTableName(urlPacthTableName, name, tableName);
    this.setState(() => ({ tableName: [{ ...response.name }] }));
  };

  onChangeLabel = async obj => {
    const colsOrRows = checkIfRow(obj);
    const {
      [colsOrRows]: { _id },
    } = obj;
    const { urlUpdateCell } = endpoint;

    const response = await updateOne(
      urlUpdateCell(colsOrRows),
      obj[colsOrRows]
    );

    this.setState(prev => ({
      [colsOrRows]: prev[colsOrRows].map(item => {
        if (item._id === _id) {
          return { ...item, ...response };
        }
        return { ...item };
      }),
    }));
  };

  onChangeImage = async obj => {
    const colsOrRows = checkIfRow(obj);
    const { urlUploadImage } = endpoint;
    const {
      [colsOrRows]: { _id },
      file,
    } = obj;
    const response = await uploadImage(urlUploadImage(colsOrRows), file, _id);

    this.setState(prev => ({
      [colsOrRows]: prev[colsOrRows].map(item => {
        if (item._id === _id) {
          return { ...item, ...response };
        }
        return { ...item };
      }),
    }));
  };

  addNew = async obj => {
    const colsOrRows = checkIfRow(obj);
    const { urlAddNew } = endpoint;
    const response = await postNew(urlAddNew(colsOrRows), colsOrRows);
    this.setState(prev => ({
      [colsOrRows]: [
        ...prev[colsOrRows],
        {
          ...response,
        },
      ],
    }));
  };

  handleCheckedRadio = async obj => {
    const { _id } = obj;
    const { urlUpdateCell } = endpoint;

    const response = await updateOne(urlUpdateCell('rows'), obj);
    this.setState(prev => ({
      rows: prev.rows.map(item => {
        if (item._id === _id) {
          return { ...item, ...response };
        }
        return { ...item };
      }),
    }));
  };

  handleRemove = async obj => {
    const colsOrRows = checkIfRow(obj);
    const { urlDeleteOne } = endpoint;
    const {
      [colsOrRows]: { _id },
    } = obj;

    await deleteOne(urlDeleteOne(colsOrRows), obj[colsOrRows]);

    this.setState(prev => ({
      [colsOrRows]: prev[colsOrRows].filter(cell => cell._id !== _id),
    }));
  };

  numberOfImages = () => {
    const { rows, columns } = this.state;
    return findNoOfImages(rows, columns);
  };

  longestLabel = () => {
    const { rows, columns } = this.state;
    return findLongestLabel(rows, columns);
  };

  render() {
    const { rows, columns, tableName } = this.state;
    return (
      <div className="container">
        <div className="table">
          <TableName
            tableName={tableName[0].tableName}
            onTableName={this.onTableName}
          />
          <div className="columns">
            {columns.map((column, i) => (
              <Column
                column={column}
                label={column.label}
                key={i}
                handleChangeLabel={this.onChangeLabel}
                handeChangeImage={this.onChangeImage}
                handleRemove={this.handleRemove}
              />
            ))}
            <div className="add-btn-col">
              <AddNew addNew={this.addNew} obj={{ columns }} />
            </div>
          </div>
          <div className="rows">
            {rows.map((row, i) => (
              <Row
                row={row}
                columnsLength={columns}
                label={row.label}
                checkedRadio={row.checked}
                key={i}
                handleChangeLabel={this.onChangeLabel}
                handeChangeImage={this.onChangeImage}
                handleRemove={this.handleRemove}
                handleCheckedRadio={this.handleCheckedRadio}
              />
            ))}
            <div className="add-btn-row">
              <AddNew addNew={this.addNew} obj={{ rows }} />
            </div>
          </div>
        </div>
        <Summary
          rows={rows}
          columns={columns}
          numberOfImages={this.numberOfImages}
          longestLabel={this.longestLabel}
        />
      </div>
    );
  }
}

export default Table;
