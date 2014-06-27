var flatiron = require('flatiron'),
    path = require('path'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.cli, {
    version: true,
    source: path.join(__dirname, 'lib', 'commands'),
    usage: ""
});

module.exports = app;
app.start();