(function() {
    "use strict";
    
    var cli = require('../../app');
    
    var version = function() {
        cli.log.info('Current Congregate version is: 0.1.0 '.magenta + '.');
    }
    
    
    module.exports = version;
})();