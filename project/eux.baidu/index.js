const rp = require('request-promise');
const cheerio = require('cheerio');
const log4js = require('log4js');
const Async = require('async');

const { euxBaidu } = require('./../../config/index');
const queryDb = require('./../queryDb');

// 日志管理
const logger = log4js.getLogger('cheese');

const euxBaiduProjectCall = () => {
  rp(euxBaidu.host + '/fe')
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
  const postArray = [];
  $('.eux-stream .inner article').each((index, item) => {
    const post = {
      url: euxBaidu.host + $(item).find('a').attr('href'),
      cover: $(item).find('img').attr('src'),
      title: $(item).find('h2 a').text(),
    };
    postArray.push(post);
  });
  Async.eachOfSeries(postArray, function(item, key, next) {
    queryDb(item, euxBaidu, articleTotal, key, next);
  }, function(err) {
    if (err) console.err(err);
  });
}

module.exports = euxBaiduProjectCall;