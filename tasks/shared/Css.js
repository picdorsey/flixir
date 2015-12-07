var gulp   = require('gulp');
var Flixir = require('../../index');

var $ = Flixir.Plugins;
var config = Flixir.config;


module.exports = function(options) {
    var name = options.name;

    options.task.log(options.src, options.output);

    return (
        gulp
        .src(options.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe($.cssGlobbing({extensions: ['.scss']}))
        .pipe(options.compiler(options.pluginOptions))
        .on('error', function(e) {
            new Flixir.Notification().error(e, name + ' Compilation Failed');

            this.emit('end');
        })
        .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
        .pipe($.concat(options.output.name))
        .pipe($.if(config.production, $.minifyCss(config.css.minifyCss.pluginOptions)))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(gulp.dest(options.output.baseDir))
        .pipe(new Flixir.Notification(name + ' Compiled!'))
    );
};
