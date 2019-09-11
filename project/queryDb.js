'use strict';
const Article = require('../models/article');
const dingTalkRobot = require('./../notifyClient/dingtalk');

const log4js = require('log4js');


// 日志管理
const logger = log4js.getLogger('cheese');

let articleCount = 0;

exports.queryDb = (post, webSite, articleTotal, index, next) => {
  Article.findOne({ 'title': post.title }, 'title cover', function (err, person) {
    if (err) {
      console.err(err);
      logger.error(err);
      next();
    } else {
      if (person === null) {
        // 有 n 条数据的情况
        articleCount ++;
        const article = new Article(post);
        article
          .save()
          .then(result => {
            next();
            // console.log(post, webSite, articleTotal, index, '保存成功！');
            // 钉钉通知群组
            if (articleCount > 1) {
              result.text = `${result.title} -> 最新内容来自于《${webSite.name}》 | 一共有${articleCount}条新内容请注意`;
            }
            if (articleCount === 1) {
              result.text = `${result.title} -> 最新内容来自于《${webSite.name}》`;
            }
            if ((index + 1) === articleTotal && articleCount > 0) {
              console.log('执行');
              dingTalkRobot(result);
              articleCount = 0;
            }
          })
          .catch(err => {
            next();
            logger.error(err);
          });
      } else {
        next();
      }
    };
  });
}
