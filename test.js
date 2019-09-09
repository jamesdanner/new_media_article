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

// var log4js = require('log4js');
// var logger = log4js.getLogger();
// logger.level = 'debug';
// logger.debug("Some debug messages");

const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Comté.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');