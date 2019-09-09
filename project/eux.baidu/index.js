const rp = require('request-promise');
const cheerio = require('cheerio');
const log4js = require('log4js');

const { euxBaidu } = require('./../../config/index');
const queryDb = require('./../queryDb');

// 日志管理
const logger = log4js.getLogger('cheese');

const euxBaiduProjectCall = () => {
  rp(euxBaidu.url + '/fe')
  .then((htmlString) => {
    analysisHtml(htmlString);
  })
  .catch((err) => {
    logger.error(err);
  });
}


  // 解析HTML
const analysisHtml = (html) => {
  const $ = cheerio.load(html);
  const articleTotal = $('.eux-stream .inner article').length;
  $('.eux-stream .inner article').each((index, item) => {
    const post = {
      url: euxBaidu.url + $(item).find('a').attr('href'),
      cover: $(item).find('img').attr('src'),
      title: $(item).find('h2 a').text(),
    };
    queryDb(post, euxBaidu, articleTotal, index);
  });
}

module.exports = euxBaiduProjectCall;