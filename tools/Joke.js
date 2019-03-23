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

module.exports = {
  getRandomJoke,
};
