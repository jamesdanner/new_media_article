
// 项目信息
const projects = {
  auto: {
    name: '京东凹凸实验室',
    host: 'https://aotu.io'
  },
  euxBaidu: {
    name: '百度EUX',
    host: 'http://eux.baidu.com'
  },
  feTaobao: {
    name: '淘系前端团队（FED）',
    host: 'https://fed.taobao.org/'
  },
  uedCtrip: {
    name: '携程设计委员会',
    host: 'http://ued.ctrip.com/',
    cover: 'http://5b0988e595225.cdn.sohucs.com/images/20190305/ea7cf5238f464503a6a7df12eaffa19d.jpeg',
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