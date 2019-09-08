const rp = require('request-promise');
const cheerio = require('cheerio');

const { auto } = require('./../../config/index');
const Article = require('../../models/article');
const dingTalkRobot = require('./../../notifyClient/dingtalk');


const autoProjectCall = () => {
  rp(auto.url + '/index.html')
  .then((htmlString) => {
    analysisHtml(htmlString);
  })
  .catch((err) => {
      // Crawling failed...
  });
}


  // 解析HTML
const analysisHtml = (html) => {
  const $ = cheerio.load(html);
  // console.log(html);
  $('#posts article').each((index, item) => {
    const post = {
      url: auto.url + $(item).find('a').attr('href'),
      cover: $(item).find('img').attr('src'),
      title: $(item).find('a').attr('title')
    };
    Article.findOne({ 'title': post.title }, 'title cover', function (err, person) {
      if (err) {
        console.log(err);
      } else {
        if (person === null) {
          const article = new Article(post);
          article
            .save()
            .then(result => {
              console.log(result, '保存成功！');
              // 钉钉通知群组
              result.text = `${result.title}最新内容来自于《${auto.name}》`
              dingTalkRobot(result);
            })
            .catch(err => {
              console.log(err);
            });
        }
      };
    });
  });
}

module.exports = autoProjectCall;