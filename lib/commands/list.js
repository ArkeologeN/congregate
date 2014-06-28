(function() {
    "use strict";
    
    var cluster = require('cluster'),
        cli = require('../../app'),
        exec = require('child_process').exec;

    module.exports = function() {
        var argv = cli.argv,
            title = argv.name || undefined,
            port = argv.port || undefined;
            
        if (!title && !port) {
            throw new Error("You must either provide --title or --port to get all workers!");
        }
        
        var command = title ? 'pgrep ^' + title : "fuser -v " + port + "/tcp";
        exec(command, function(err, stdout, stderr) {
            output(stdout);
        });
        
        var output = function(data) {
            if (!data) {
                cli.log.info("=====================================================".magenta);
                cli.log.info("  Shards:                 ".yellow + 0 + "".cyan);
                cli.log.info("=====================================================".magenta);
                cli.log.info("=====================================================".magenta);
                cli.log.info("  Processes:              ".yellow  + "n/a".cyan);
                cli.log.info("=====================================================".magenta);
            } else {
                var pids = data.toString().trim().split(/\s+/g).filter(Boolean);
                cli.log.info("=====================================================".magenta);
                cli.log.info("  Master:                 ".yellow + "1".cyan);
                cli.log.info("=====================================================".magenta);
                cli.log.info("=====================================================".magenta);
                cli.log.info("  Shards:                 ".yellow + (pids.length -1).toString().cyan);
                cli.log.info("=====================================================".magenta);
                cli.log.info("=====================================================".magenta);
                cli.log.info("  Processes:              ".yellow  + pids.join(', ').cyan);
                cli.log.info("=====================================================".magenta);
            }
        }
    }    
})();