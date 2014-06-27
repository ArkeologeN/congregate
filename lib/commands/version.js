(function() {
    "use strict";
    
    var cli = require('../../app');
    
    var version = function() {
        cli.log.info(require('../../package.json').version);
    }
    
    
    module.exports = version;
})();