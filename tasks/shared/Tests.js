var gulp = require('gulp');
var Flixir = require('../../index');

var notify = new Flixir.Notification();

module.exports = function(name, src, command) {
    new Flixir.Task(name, function(error) {
        Flixir.Log.heading('Triggering ' + name + ': ' + command);

        return (
            gulp
            .src('')
            .pipe(Flixir.Plugins.shell(command))
            .on('error', function(e) {
                notify.forFailedTests(e, name);

                this.emit('end');
            })
            .pipe(notify.forPassedTests(name))
        );
    })
    .watch(src)
    .watch(Flixir.config.appPath + '/**/*.php', 'tdd')
    .watch(Flixir.config.viewPath +'/**/*.php', 'tdd');
};
