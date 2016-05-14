import compile from './shared/Css';
import Flixir from './../';

const config = Flixir.config;

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

const gulpTask = function (src, output, options) {
    const paths = prepGulpPaths(src, output);

    new Flixir.Task('sass', function () {
        return compile({
            name: 'Sass',
            compiler: require('gulp-sass'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.sass.pluginOptions
        });
    })
    .watch('./' + config.get('assets.css.sass.folder') + '/**/*.+(sass|scss)')
    .ignore(paths.output.path);
};


Flixir.extend('sass', function () {
    gulpTask.apply(this, arguments);
});


// Deprecated. Only for backward compatibility.
Flixir.extend('rubySass', function () {
    gulpTask.apply(this, arguments);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
const prepGulpPaths = function (src, output) {
    return new Flixir.GulpPaths()
        .src(src, config.get('assets.css.sass.folder'))
        .output(output || config.get('public.css.outputFolder'), 'app.css');
};
