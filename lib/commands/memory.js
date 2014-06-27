(function() {
    "use strict";
    
    var cli = require('../../app');
    
    module.exports = function(argv) {
        var memory = process.memoryUsage();
        for (var m in memory) {
            var string = m + ": " + memory[m];
            cli.log.info(string.cyan);
        }
    };
})();
    