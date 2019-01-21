import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { checkIfRow } from '../../utils';

const AddNew = props => {
  const { addNew, obj } = props;
  const colsOrRows = checkIfRow(obj);

  return (
    <FontAwesomeIcon
      onClick={() => addNew({ [colsOrRows]: {} })}
      icon={faPlus}
    />
  );
};

AddNew.propTypes = {
  obj: PropTypes.shape({}).isRequired,
  addNew: PropTypes.func.isRequired,
};

export default AddNew;
