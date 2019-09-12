'use strict';
const rp = require('request-promise');
const cheerio = require('cheerio');
const log4js = require('log4js');
const Async = require('async');

const { uedCtrip } = require('./../../config/index');
const queryDb = require('./../queryDb');

// 日志管理
const logger = log4js.getLogger('cheese');

const uedCtripProjectCall = () => {
  rp(uedCtrip.host)
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
  const $articleList = $('.main .node');
  const articleTotal = $articleList.length;
  const postArray = [];
  $articleList.each((index, item) => {
    const post = {
      url: $(item).find('a').attr('href'),
      cover: uedCtrip.cover,
      title: $(item).find('a').attr('title')
    };
    postArray.push(post);
  });
  
  Async.eachOfSeries(postArray, (item, key, next) => {
    queryDb(item, uedCtrip, articleTotal, key, next);
  }, function(err) {
    if (err) console.err(err);
  });
}

module.exports = uedCtripProjectCall;