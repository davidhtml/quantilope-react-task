const checkIfRow = obj =>
  Object.prototype.hasOwnProperty.call(obj, 'rows') ? 'rows' : 'columns';

export { checkIfRow };
