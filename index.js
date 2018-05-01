#!/usr/bin/env node
'use strict';

var ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Argparse example'
});

const ConfigParser = require('configparser');

const config = new ConfigParser();

parser.addArgument(
    ['-p', '--port'],
    {
        help: 'port'
    }
);

parser.addArgument(
    ['-c', '--config'],
    {
        help: 'config'
    }
);

var args = parser.parseArgs();
const app = require('express')();

config.read(args.config || 'my-config.cfg');
config.sections(); // ['User', 'MetaData']
config.get('User', 'token'); // 'some value'
console.dir(args);

const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'log/cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
 
const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');

app.get('/', (req, res) => {
    res.send('args : ' + args + ' config : ' + config.get('User', 'token'));
});

app.listen(args.port || 3000, () => console.log('Server running'));