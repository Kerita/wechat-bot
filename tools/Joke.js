const axios = require('axios');

const getRandomJoke = async () => {
  const rsp = await axios.get('http://www.mxnzp.com/api/jokes/list/random');
  let result = '';
  if (rsp.data.code === 1) {
    rsp.data.data.slice(0, 5).forEach((item, key) => {
      const { content } = item;
      result += `${key + 1}.${content}\n\n`;
    });
  }
  return result;
};

const getRandomEnglishJoke = async () => {
  const rsp = await axios.get('http://api.icndb.com/jokes/random/5');
  let result = '';
  if (rsp.data.type === 'success') {
    rsp.data.value.slice(0, 5).forEach((item, key) => {
      const { joke } = item;
      result += `${key + 1}.${joke}\n\n`;
    });
  }
  return result;
};

module.exports = {
  getRandomJoke,
  getRandomEnglishJoke,
};
