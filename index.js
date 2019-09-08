const mongoose = require('mongoose');
const schedule = require('node-schedule');
const log4js = require('log4js');

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

mongoose.connect('mongodb://localhost:27017/media');
const db = mongoose.connection;
db.once('open', () => console.log('mongoose is ok!'));

// 定时任务
schedule.scheduleJob('30 37 24 * * *', () => {
  // 凹凸实验室
  autoProjectCall();
});