import gulp from 'gulp';
import Flixir from './../';

const $ = Flixir.Plugins;

/*
 |----------------------------------------------------------------
 | File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate an array of files. Nothing more
 | nothing less. Note that, while, say, mix.scripts() runs
 | general compilation on the files, this one does not.
 |
 */

Flixir.extend('combine', function(src, output, baseDir) {
    const paths = prepGulpPaths(src, baseDir, output);

    new Flixir.Task('combine', function() {
        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.concat(paths.output.name))
            .pipe(gulp.dest(paths.output.baseDir))
        );
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string}       baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
const prepGulpPaths = function(src, baseDir, output) {
    return new Flixir.GulpPaths()
        .src(src, baseDir || '')
        .output(output);
};
