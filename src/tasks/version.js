import Flixir from './../';

let publicPath  = Flixir.config.publicPath;
let fs;
let del;
let glob;
let gulp;
let rev;
let vinylPaths;
let parsePath;
let revReplace;

/*
 |----------------------------------------------------------------
 | Versioning / Cache Busting
 |----------------------------------------------------------------
 |
 | This task will append a small hash on the end of your file
 | and generate a manifest file which contains the current
 | "version" of the filename for the application to use.
 |
 */

Flixir.extend('version', function (src, buildPath) {
    const paths = prepGulpPaths(src, buildPath);

    loadPlugins();

    new Flixir.Task('version', function () {
        const files = vinylPaths();
        const manifest = paths.output.baseDir + '/rev-manifest.json';

        this.log(paths.src, paths.output);

        emptyBuildPathFiles(paths.output.baseDir, manifest);

        // We need to remove the publicPath from the output base to get the
        // correct prefix path.
        const filePathPrefix = paths.output.baseDir.replace(publicPath, '').replace('\\','/') + '/';

        return (
            gulp.src(paths.src.path, { base: './' + publicPath })
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(files)
            .pipe(rev())
            .pipe(revReplace({prefix: filePathPrefix}))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(rev.manifest())
            .pipe(gulp.dest(paths.output.baseDir))
            .on('end', function() {
                // We'll get rid of the duplicated file that
                // usually gets put in the "build" folder,
                // alongside the suffixed version.
                del(files.paths.filter(file => {
                    return fs.lstatSync(file).isFile();
                }), { force: true });

                // We'll also copy over relevant sourcemap files.
                copyMaps(paths.src.path, paths.output.baseDir);
            })
        );
    })
    .watch(paths.src.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  buildPath
 * @return {GulpPaths}
 */
function prepGulpPaths(src, buildPath) {
    src = Array.isArray(src) ? src : [src];
    buildPath = buildPath || Flixir.config.get('public.versioning.buildFolder')

    const paths = new Flixir.GulpPaths()
        .src(src, Flixir.config.publicPath)
        .output(buildPath);

    // We've no interested in tracking the
    // build directory, so we'll always
    // exclude it from the src set.
    paths.src.path = paths.src.path.concat([
        '!'+buildPath,
        '!'+buildPath+'/**'
    ]);

    return paths;
};

/**
 * Empty all relevant files from the build directory.
 *
 * @param {string} buildPath
 * @param {string} manifest
 */
function emptyBuildPathFiles(buildPath, manifest) {
    fs.stat(manifest, function(err, stat) {
        if (! err) {
            manifest = JSON.parse(fs.readFileSync(manifest));

            for (var key in manifest) {
                del.sync(buildPath + '/' + manifest[key], { force: true });
            }
        }
    });
};

/**
 * Copy source maps to the build directory.
 *
 * @param {string} src
 * @param {string} buildPath
 */
function copyMaps(src, buildPath) {
    src.forEach(file => {
        // We'll first get any files from the src
        // array that have companion .map files.

        glob(file, {}, function (error, files) {
            if (error) return;

            files
                .filter(file => fs.existsSync(file + '.map'))
                .forEach(file => {
                    // We will loop over this files array, and
                    // copy each map to the build directory.
                    const map = file.replace(publicPath, buildPath);

                    gulp.src(`${file}.map`).pipe(gulp.dest(parsePath(map).dirname));
                });
        });
    });
};

/**
 * Load the required Gulp plugins on demand.
 */
function loadPlugins() {
    fs = require('fs');
    del = require('del');
    glob = require('glob');
    gulp = require('gulp');
    rev = require('gulp-rev');
    vinylPaths = require('vinyl-paths');
    parsePath  = require('parse-filepath');
    revReplace = require('gulp-rev-replace');
};
