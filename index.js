const mongoose = require('mongoose');
const schedule = require('node-schedule');
const log4js = require('log4js');
// 日志管理
const logger = log4js.getLogger('cheese');
log4js.configure({
  category: 'category1',
  appenders: {
    cheese: {
      type: 'file',
      filename: 'logs/cheese.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'info'
    }
  }
});


const autoProjectCall = require('./project/aotu.io/index');
const euxBaiduProjectCall = require('./project/eux.baidu/index');
const feTaobaoProjectCall = require('./project/fe.taobao/index');
const uedCtripProjectCall = require('./project/ued.ctrip/index');

mongoose.connect('mongodb://localhost:27017/media');
const db = mongoose.connection;
db.once('open', () => console.log('mongoose is ok!'));

// 定时任务
schedule.scheduleJob('00 00 10 * * *', () => {
  // 凹凸实验室
  logger.info('凹凸实验室 启动');
  autoProjectCall();
  euxBaiduProjectCall();
  feTaobaoProjectCall();
  uedCtripProjectCall();
});
