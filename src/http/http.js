const getAll = url => fetch(url).then(r => r.json());

const patchTableName = (url, name, tableName) =>
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tableName: name,
      _id: tableName[0]._id,
    }),
  }).then(r => r.json());

const postNew = (url, colsOrRows) => {
  const body = {
    label: `${colsOrRows}`,
    image: {},
    checked: '',
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(r => r.json());
};

const deleteOne = (url, body) => {
  console.log('delete one URL', url);
  console.log('delete one URL', body);
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(r => r.json());
};
const updateOne = (url, body) =>
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(r => r.json());

const uploadImage = (url, file, _id) => {
  const formData = new FormData();
  formData.append('image', file, _id);
  return fetch(url, {
    method: 'POST',
    body: formData,
  }).then(r => r.json());
};

export { patchTableName, getAll, postNew, deleteOne, updateOne, uploadImage };
