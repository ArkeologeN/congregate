(function() {
   "use strict";
   
   var cli = require('../../app');
   
   module.exports = function(argv) {
       
       var cluster = require('cluster');
       
       var totalShards = argv.params.shards ? argv.params.shards.shift() : require('os').cpus().length,
                signal  = argv.params.signal ? argv.params.signal.shift() : "SIGUSR2";
                
                
        var app = argv.params.app ? argv.params.app.shift() : undefined;
        
        if (!app && !process.env.CONG_APP_PATH) {
            throw new Error("Neither --app passed to your entrypoint nor CONG_APP_PATH available as environment variable!");
        }
        
        if (!app && process.env.CONG_APP_PATH) {
            app = process.env.CONG_APP_PATH;
        }
   
       if (cluster.isMaster) {
            cluster.on('exit', function(shard, code) {
                if (!shard.suicide) {
                    cli.log.info('oops! Your process shard crashed! Spawning a replacement  '.cyan + '.');
                    cluster.fork();
                }
            });
            
            for (var i = 0; i < totalShards; i += 1) {
                cluster.fork();
            }
            
            var stopShard = function stopShard(shard, fn) {
                cluster.workers[shard].disconnect();
                cluster.workers[shard].on('disconnect', function() {
                    cli.log.info('Shard: ' + shard + " has been stopped!".cyan);
                    return fn();
                });
            };
            
            var restartShard = function restartShard(shards) {
                var shard = shards.shift();
                
                cli.log.info("Restarting Shard: " + shard);
                stopShard(shard, function() {
                    var freshShard = cluster.fork();
                    freshShard.on('listening', function() {
                        cli.log.info("Refreshed Shard is back online! ");
                        if (shards.length > 0 ) {
                            restartShard(shards);
                        }
                    });
                });
            };
            
            var shutdownShards = function(shards) {
                var shard = shards.shift();
                cli.log.info("Shutting Down your shard: ".cyan + shard);
                stopShard(shard, function() {
                    if (shards.length > 0) {
                        shutdownShards(shards);
                    } else {
                        cli.log.info("Exiting the process finally!");
                        process.exit();
                    }
                });
            }
            
            
            var stop = function() {
                var shards = Object.keys(cluster.workers);
                shutdownShards(shards);
            };
            
            
            process.on(signal, function() {
                cli.log.verbose("Reloading Process Sharding Workers!");
        
                // delete the cached module, so we can reload the app
                delete require.cache[require.resolve(app)];
                var shards = Object.keys(cluster.workers);
                restartShard(shards);
            });
            
            process.on('SIGTERM', stop);
            process.on('SIGQUIT', stop);
       } else {
           require(require.resolve(app));
           cli.log.info("Shard is running as: " + cluster.worker.id);
       }
   }
})();