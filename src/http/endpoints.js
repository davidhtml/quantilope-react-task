const baseUrl = 'https://mysterious-ridge-97002.herokuapp.com';

const endpoint = {
  urlPacthTableName: `${baseUrl}/table1/name`,
  urlGetAll: `${baseUrl}/table1/all`,
  urlAddNew(param) {
    return `${baseUrl}/table1/${param}`;
  },
  urlDeleteOne(param) {
    return `${baseUrl}/table1/${param}`;
  },
  urlUpdateCell(param) {
    return `${baseUrl}/table1/${param}`;
  },
  urlUploadImage(param) {
    return `${baseUrl}/${param}/images`;
  },
};

export { endpoint };
