const mongoose = require('mongoose');
const schedule = require('node-schedule');

const autoProjectCall = require('./project/aotu.io/index');

mongoose.connect('mongodb://localhost:27017/media');
const db = mongoose.connection;
db.once('open', () => console.log('mongoose is ok!'));

// 定时任务
schedule.scheduleJob('30 37 24 * * *', () => {
  autoProjectCall();
});

