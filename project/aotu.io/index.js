const rp = require('request-promise');
const cheerio = require('cheerio');
const log4js = require('log4js');

const { auto } = require('./../../config/index');
const Article = require('../../models/article');
const dingTalkRobot = require('./../../notifyClient/dingtalk');

// 日志管理
const logger = log4js.getLogger('cheese');

const autoProjectCall = () => {
  rp(auto.url + '/index.html')
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
  $('#posts article').each((index, item) => {
    const post = {
      url: auto.url + $(item).find('a').attr('href'),
      cover: $(item).find('img').attr('src'),
      title: $(item).find('a').attr('title')
    };
    Article.findOne({ 'title': post.title }, 'title cover', function (err, person) {
      if (err) {
        logger.error(err);
      } else {
        if (person === null) {
          const article = new Article(post);
          article
            .save()
            .then(result => {
              console.log(result, '保存成功！');
              // 钉钉通知群组
              result.text = `${result.title} -> 最新内容来自于《${auto.name}》`
              dingTalkRobot(result);
            })
            .catch(err => {
              logger.error(err);
            });
        }
      };
    });
  });
}

module.exports = autoProjectCall;