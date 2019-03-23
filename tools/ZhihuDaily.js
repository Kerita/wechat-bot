const axios = require('axios');

const getLastestNews = async () => {
  const rsp = await axios.get('https://news-at.zhihu.com/api/4/news/latest');
  const { stories, top_stories: topStories } = rsp.data;
  let result = '';
  const ids = {};
  [...stories, ...topStories].forEach((item, key) => {
    const { title, id } = item;
    if (ids[id]) {
      return;
    }
    ids[id] = true;
    result += `${key + 1}.${title}\nhttp://daily.zhihu.com/story/${id}\n\n`;
  });
  return result;
};

module.exports = {
  getLastestNews,
};
