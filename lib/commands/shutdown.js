(function () {
    'use strict';
    
    var cli = require('../../app'),
        Table   = require('cli-table'),
        colors  = require('colors'),
        ps      = require('ps-node'),
        exec = require('child_process').exec;
        
        
    module.exports = function () {
        var argv = cli.argv,
            port = argv.port;
            
        if (!port) {
            return console.log('You must  provide --port to shutdown the `congregate`!'.red.bold.bgWhite);
        }
            
        var command = "fuser " + port + "/tcp";
        // console.log(command);
        // return false;
        exec(command, function(err, stdout, stderr) {
            if (err) return console.log(err.message.toString().red.bold.bgWhite);
            console.log(arguments);
            process.kill(stdout.toString().trim(), 'SIGQUIT');
        });
    };
    
}());