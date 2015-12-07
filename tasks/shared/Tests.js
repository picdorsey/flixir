var gulp = require('gulp');
var Flixir = require('../../index');

var notify = new Flixir.Notification();


module.exports = function(options) {
    new Flixir.Task(options.name, function() {
        this.log(options.src);

        return (
            gulp
            .src(options.src)
            .pipe(options.plugin('', options.pluginOptions))
            .on('error', function(e) {
                notify.forFailedTests(e, options.name);

                this.emit('end');
            })
            .pipe(notify.forPassedTests(options.name))
        );
    })
    .watch(options.src, 'tdd')
    .watch(Flixir.config.appPath + '/**/*.php', 'tdd')
    .watch('./resources/views/**/*.php', 'tdd')
};
