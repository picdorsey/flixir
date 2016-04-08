import gulp from 'gulp';
import Flixir from './../';

const $ = Flixir.Plugins;
const config = Flixir.config;

/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

Flixir.extend('scripts', function(scripts, output, baseDir) {
    const paths = prepGulpPaths(scripts, baseDir, output);

    new Flixir.Task('scripts', function() {
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


Flixir.extend('scriptsIn', function(baseDir, output) {
    const paths = prepGulpPaths('**/*.js', baseDir, output);

    new Flixir.Task('scriptsIn', function() {
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


Flixir.extend('babel', function(scripts, output, baseDir, options) {
    const paths = prepGulpPaths(scripts, baseDir, output);

    new Flixir.Task('babel', function() {
        const babelOptions = options || config.js.babel.options;

        return gulpTask.call(this, paths, babelOptions);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});

/**
 * Trigger the Gulp task logic.
 *
 * @param {GulpPaths}   paths
 * @param {object|null} babel
 */
const gulpTask = function(paths, babel) {
    this.log(paths.src, paths.output);

    return (
        gulp
        .src(paths.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe($.concat(paths.output.name))
        .pipe($.if(babel, $.babel(babel)))
        .on('error', function(e) {
            new Flixir.Notification().error(e, 'Babel Compilation Failed!');
            this.emit('end');
        })
        .pipe($.if(config.production, $.uglify(config.js.uglify.options)))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(gulp.dest(paths.output.baseDir))
        .pipe(new Flixir.Notification('Scripts Merged!'))
    );
};

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
const prepGulpPaths = function(src, baseDir, output) {
    return new Flixir.GulpPaths()
        .src(src, baseDir || config.get('assets.js.folder'))
        .output(output || config.get('public.js.outputFolder'), 'all.js');
};
