const rp = require('request-promise');
const cheerio = require('cheerio');
const log4js = require('log4js');

const { feTaobao } = require('./../../config/index');
const queryDb = require('./../queryDb');

// 日志管理
const logger = log4js.getLogger('cheese');

const feTaobaoProjectCall = () => {
  rp(feTaobao.host)
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
  const articleTotal = $('.archives article').length;
  $('.archives article').each((index, item) => {
    const post = {
      url: feTaobao.host + $(item).find('a').attr('href'),
      cover: $(item).find('.thumbnail-image').css('background-image').replace('url(','').replace(')',''),
      title: $(item).find('.title').text()
    };
    queryDb(post, feTaobao, articleTotal, index);
  });
}

module.exports = feTaobaoProjectCall;