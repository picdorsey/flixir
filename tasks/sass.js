var gulp    = require('gulp');
var compile = require('./shared/Css');
var Flixir = require('../index');

var config = Flixir.config;


/*
 |----------------------------------------------------------------
 | Sass Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Sass, including minification and
 | and auto-prefixing. Sass is one of the CSS pre-precessors
 | supported by Flixir, along with the Less CSS processor.
 |
 */

var gulpTask = function(src, output, options) {
    var paths = prepGulpPaths(src, output);

    new Flixir.Task('sass', function() {
        return compile({
            name: 'Sass',
            compiler: require('gulp-sass'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.sass.pluginOptions
        });
    })
    .watch(paths.src.baseDir + '/**/*.scss')
    .ignore(paths.output.path);
};


Flixir.extend('sass', function() {
    gulpTask.apply(this, arguments);
});


// Deprecated. Only for backward compatibility.
Flixir.extend('rubySass', function() {
    gulpTask.apply(this, arguments);
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Flixir.GulpPaths()
        .src(src, config.get('assets.css.sass.folder'))
        .output(output || config.get('public.css.outputFolder'), 'app.css');
};
