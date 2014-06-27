#!/usr/bin/env node

/**
 * Dependencies.
 */

var argv = require('argvee')();
var path = require('path');
var EventEmitter = require('events').EventEmitter;
var basename = path.basename;
var join = path.join;

/**
 * Coordinator.
 */

var coord = new EventEmitter();

/**
 * Requested command.
 */

var command = basename(argv.commands.shift() || 'ls');

/**
 * Catch all errors and print them in a nice-ish way.
 * It prints the stack when invoked with `--debug`.
 */

process.on('uncaughtException', function(err) {
  var out = ~argv.modes.indexOf('debug') && err.stack
    ? err.stack
    : 'Congregate: ' + err.message;

  console.error(out);
  process.exit(1);
});

/**
 * Require the requested command.
 */

try {
  var ret = require('../lib/commands/' + command)(argv);
  coord.emit(command, ret);
} catch(e) {
    console.log(e.stack);
  if ('MODULE_NOT_FOUND' !== e.code) throw e;
  throw new Error('Unrecognized command "' + command + '"');
}