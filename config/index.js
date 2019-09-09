
// 项目信息
const projects = {
  auto: {
    name: '京东凹凸实验室',
    url: 'https://aotu.io'
  },
  euxBaidu: {
    name: '百度EUX',
    url: 'http://eux.baidu.com'
  }
};

// 客户端地址
const client = {
  dingtalkWebHookUrl: 'https://oapi.dingtalk.com/robot/send?access_token=d8159002f396b1dae0d9578f93b1a1f9d43be50831d171c278c7b32056221cdb',
};


module.exports = {
  ...projects,
  ...client,
};