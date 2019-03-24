const axios = require('axios');

const itpkChat = async (question) => {
  axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8" == "application/json';
  const rsp = await axios.get('http://api.qingyunke.com/api.php', {
    params: {
      key: 'free',
      appid: 0,
      msg: encodeURI(question),
    },
  });
  if (rsp.data.result === 0) {
    return rsp.data.content.replace(/{br}/g, '\n');
  }
  return '出错了';
};

module.exports = {
  itpkChat,
};
