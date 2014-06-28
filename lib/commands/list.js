(function() {
    "use strict";
    
    var cluster = require('cluster'),
        cli = require('../../app');

    module.exports = function() {
        console.log(cluster.workers);
        
    }    
})();