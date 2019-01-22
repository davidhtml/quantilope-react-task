const findNoOfImages = (rows, columns) => {
  const imgRows = rows.filter(row => row.image !== '');
  const imgCol = columns.filter(column => column.image !== '');
  return [...imgRows, ...imgCol];
};

const findLongestLabel = (rows, columns) => {
  const longRow = rows.reduce(
    (a, b) => (a.label.length > b.label.length ? a : b),
    {
      label: '',
    }
  );
  const longCol = columns.reduce(
    (a, b) => (a.label.length > b.label.length ? a : b),
    {
      label: '',
    }
  );
  return { row: longRow, col: longCol };
};

export { findNoOfImages, findLongestLabel };
