var gulp = require('gulp');
var Flixir = require('../index');

var $ = Flixir.Plugins;


/*
 |----------------------------------------------------------------
 | Copying
 |----------------------------------------------------------------
 |
 | This task offers a simple way to copy files from one place to
 | another. No more complicated than that! You may either set
 | a single file or alternatively you can copy a full dir.
 |
 */

Flixir.extend('copy', function(src, output) {
    var paths = new Flixir.GulpPaths().src(src).output(output);

    new Flixir.Task('copy', function() {
        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.if(! paths.output.isDir, $.rename(paths.output.name)))
            .pipe(gulp.dest(paths.output.baseDir))
        );
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});
