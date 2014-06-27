var flatiron = require('flatiron'),
    path = require('path'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.cli, {
    version: true,
    source: path.join(__dirname, 'lib', 'commands'),
    usage: 'Node.js cluster on top of Flatiron CLI & Native cluster. Built with love!'
});

module.exports = app;
app.start();