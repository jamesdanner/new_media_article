const rp = require('request-promise');
const {
  dingtalkWebHookUrl
} = require('./../config/index');

const dingTalkRobot = (articleData) => {
  const message = {
    "msgtype": "link", 
    "link": {
      "text": articleData.text, 
      "title": articleData.title, 
      "picUrl": articleData.cover, 
      "messageUrl": articleData.url
    }
  };
  rp({
    uri: dingtalkWebHookUrl,
    method: 'POST',
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: message,
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err, 'err');
  });
}

module.exports = dingTalkRobot;