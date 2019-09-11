const rp = require('request-promise');
const cheerio = require('cheerio');
const log4js = require('log4js');

const { auto } = require('./../../config/index');
const queryDb = require('./../queryDb');

// 日志管理
const logger = log4js.getLogger('cheese');

const autoProjectCall = () => {
  rp(auto.host + '/index.html')
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
  const articleTotal = $('#posts article').length;
  $('#posts article').each((index, item) => {
    const post = {
      url: auto.host + $(item).find('a').attr('href'),
      cover: $(item).find('img').attr('src'),
      title: $(item).find('a').attr('title')
    };
    queryDb(post, auto, articleTotal, index);
  });
}

module.exports = autoProjectCall;