(function() {
    "use strict";
    
    var cluster = require('cluster'),
        cli = require('../../app'),
        Table   = require('cli-table'),
        colors  = require('colors'),
        ps      = require('ps-node'),
        exec = require('child_process').exec;

    module.exports = function() {
        var argv = cli.argv,
            title = argv.name || undefined,
            port = argv.port || undefined;
            
        if (!title && !port) {
            return console.log('You must either provide --title or --port to get all workers!'.red.bold.bgWhite);
        }
        
        // Priority for `title` lookups.
        if (title) {
            ps.lookup({
                command: title,
                psargs: 'aux'
            }, function findByTitle(err, results) {
                if (err)
                    return console.log(err.message.toString().red.bold.bgWhite);
                    
                var table = new Table({
                    head: ['PID', 'Command']
                });
                results.forEach(function (runner) {
                    table.push([runner.pid, runner.command]);
                });
                
                console.log(table.toString());  
            })
        } else {
            var command = "fuser -v " + port + "/tcp";
            exec(command, function(err, stdout, stderr) {
                if (err) return console.log(err.message.toString().red.bold.bgWhite);
                exec('pgrep -lP ' + stdout.toString().trim(), function(err, stdout, stderr) {
                    if (err) return console.log(err.message.toString().red.bold.bgWhite);
                    var table = new Table({
                        head: ['PID', 'Command']
                    });
                    
                    [].concat(stdout.split("\n").filter(Boolean)).forEach(function findByPort(runner) {
                        var chunk = runner.split(' ');
                        table.push([chunk[0], chunk[1]]);
                    })
                    
                    console.log(table.toString());  
                    
                });
            });
        }
    }    
})();