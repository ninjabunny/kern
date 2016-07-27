#!/usr/bin/env node

var Controller = require('./controller');

if (process.argv.length !== 4) {
  console.error('Usage: ' + process.argv[1] + ' <player 1> <player 2>');
}

var PlayerOne = require('./players/' + process.argv[2]),
  PlayerTwo = require('./players/' + process.argv[3]),
  controller = new Controller(new PlayerOne(), new PlayerTwo());

controller.runOneRound();
