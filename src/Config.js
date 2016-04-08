import p from 'path';
import gutils from 'gulp-util';

const production = gutils.env.production ||
                   process.env.NODE_ENV === 'production';

/*
 |----------------------------------------------------------------
 | Master Configuration
 |----------------------------------------------------------------
 |
 | This file contains the proper paths and options for each and
 | and every Gulp task that Flixir wraps up. To override any
 | setting, reference Flixir.config.* from your Gulpfile.
 |
 | Alternatively you may create an Flixir.json file within your
 | project root. As JSON, modify any settings contained here
 | and they'll take precedence over these defaults. Easy!
 |
 */

const config = {

    /*
     |----------------------------------------------------------------
     | Production Mode
     |----------------------------------------------------------------
     |
     | Flixir will trigger certain actions, dependent upon this flag.
     | You may enable this mode by triggering "gulp --production",
     | enabling things like CSS and JS minification. EasyPeasy!
     |
     */

    production,

    /*
     |----------------------------------------------------------------
     | Assets Path
     |----------------------------------------------------------------
     |
     | This assets path property is prefixed to all relevant assets
     | in your application. For example, "resources/assets/sass"
     | or "resources/assets/coffee." Change this if you must.
     |
     */

    assetsPath: 'src',

    /*
     |----------------------------------------------------------------
     | Public Path
     |----------------------------------------------------------------
     |
     | Much like assets path, this public path property is prefixed to
     | any paths in your application, that point to the public dir.
     | It's useful, when a server requires a unique public path.
     |
     */

    publicPath: 'public/assets',

    /*
     |----------------------------------------------------------------
     | App Path
     |----------------------------------------------------------------
     |
     | The app path, you guessed it, specifies the path to the app
     | folder in your project. If using Laravel, then you won't
     | need to modify this path. Otherwise modify as needed.
     |
     */

    appPath: 'app',

    /*
     |----------------------------------------------------------------
     | View Path
     |----------------------------------------------------------------
     |
     | Very likely, you will never need/want to modify this property.
     | However, for the instances where your app's views directory
     | is located in a different spot, please modify as needed.
     |
     */

    viewPath: 'resources/views',

    /*
     |----------------------------------------------------------------
     | Notifications
     |----------------------------------------------------------------
     |
     | As a convenience, Flixir will, when available, automatically
     | display OS notifications upon the completion of any task.
     | But of course you're free to disable this, if needed.
     |
     */

    notifications: true,

    /*
     |----------------------------------------------------------------
     | Sourcemaps
     |----------------------------------------------------------------
     |
     | A sourcemap is a JSON mapping, which declares a relationship
     | between a minified file and its original source location.
     | Quite useful for debugging, it's turned on by default.
     |
     */

    sourcemaps: ! gutils.env.production,

    /*
     |----------------------------------------------------------------
     | File System Event Batching
     |----------------------------------------------------------------
     |
     | You likely won't need to modify this object. That said, should
     | you need to, these settings are exclusive to the watch task.
     | They set the limit and timeout for running batch-updates.
     |
     */

    batchOptions: {
        // https://github.com/floatdrop/gulp-batch#batchoptions-callback-errorhandler
        limit: undefined,
        timeout: 1000
    },

    css: {

        /*
         |----------------------------------------------------------------
         | CSS Source Folder
         |----------------------------------------------------------------
         |
         | This property declares the root folder for all vanilla CSS
         | files. Note that this is the folder name, not the path.
         | We'll stick with a general "css" name - makes sense.
         |
         */

        folder: 'css',

        /*
         |----------------------------------------------------------------
         | CSS Output Folder
         |----------------------------------------------------------------
         |
         | Generally, your source files will be stored outside of your
         | public directory, and then compiled/merged as necessary.
         | This property represents the public specific folder.
         |
         */

        outputFolder: 'css',

        /*
         |----------------------------------------------------------------
         | CSS3 Autoprefixing
         |----------------------------------------------------------------
         |
         | When working with any form of CSS, Flixir automatically runs
         | your file through a CSS autoprefixer, which automatically
         | adds or removes vendor-specific CSS3 prefixes. Useful!
         |
         */

        autoprefix: {
            enabled: true,

            // https://www.npmjs.com/package/gulp-autoprefixer#api
            options:  {
                browsers: ['last 2 versions'],
                cascade: false
            }
        },

        /*
         |----------------------------------------------------------------
         | CSS3 Minification
         |----------------------------------------------------------------
         |
         | When running Gulp with the production flag, any CSS will
         | automatically be minified. This offers the benefit of
         | reduced file sizes. Adjust any plugin option here.
         |
         */

        minifier: {
            // https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
            pluginOptions: {}
        },

        /*
         |----------------------------------------------------------------
         | Sass Compilation
         |----------------------------------------------------------------
         |
         | Gone are the days of researching how to call Sass on a given
         | folder. Simply run `mix.sass('file.scss')` and you're all
         | set. This object sets the folder name and plugin opts.
         |
         */

        sass: {
            folder: 'scss',

            // https://github.com/sass/node-sass#options
            pluginOptions: {
                outputStyle: production
                    ? 'compressed'
                    : 'nested',
                precision: 10
            }
        }
    },

    js: {

        /*
         |----------------------------------------------------------------
         | JavaScript Source Folder
         |----------------------------------------------------------------
         |
         | Much like the CSS folder option above, this property sets the
         | name of the folder, not the full path, for your JavaScript
         | source files. It then gets affixed to the "assetsPath".
         |
         */

        folder: 'js',

        /*
         |----------------------------------------------------------------
         | JavaScript Output Folder
         |----------------------------------------------------------------
         |
         | Once your vanilla JavaScript files have been compiled/merged,
         | they will be saved to your public directory. This property
         | represents the name of the folder within that location.
         |
         */

        outputFolder: 'js',

        /*
         |----------------------------------------------------------------
         | Babel Compilation
         |----------------------------------------------------------------
         |
         | Think of Babel as a compiler for next-generation JavaScript.
         | If you'd like to make use of ES6 - or even ES7 features -
         | in new apps, we make it a cinch right from the get go.
         |
         */

        babel: {
            // https://www.npmjs.com/package/gulp-babel#babel-options
            options: {
                presets: ['es2015', 'react']
            }
        },

        /*
         |----------------------------------------------------------------
         | UglifyJS Parser/Compressor/Beautifier
         |----------------------------------------------------------------
         |
         | UglifyJS is a JavaScript parser/compressor/beautifier.
         | It'll minify your JavaScript with ease and has an option to
         | mangle your code.
         |
         */

        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            }
        },

        /*
         |----------------------------------------------------------------
         | Browserify Compilation
         |----------------------------------------------------------------
         |
         | Browserify allows you to pull in Node modules in the browser!
         | Generally a pain to get up and running, Flixir offers many
         | sensible defaults to get you up to speed super quickly.
         |
         */

        browserify: {
            // https://www.npmjs.com/package/browserify#usage
            options: {
                cache: {},
                packageCache: {}
            },

            plugins: [],

            externals: [],

            transformers: [
                {
                    name: 'babelify',

                    // https://www.npmjs.com/package/gulp-babel#babel-options
                    options: {
                        presets: ['es2015', 'react']
                    }
                },

                {
                    name: 'partialify',

                    // https://www.npmjs.com/package/partialify
                    options: {}
                },

                {
                    name: 'vueify',

                    // https://github.com/vuejs/vueify#usage
                    options: {}
                }
            ],

            watchify: {
                enabled: false,

                // https://www.npmjs.com/package/watchify#usage
                options: {}
            }
        }
    },

    testing: {

        /*
         |----------------------------------------------------------------
         | PHPUnit Autotesting
         |----------------------------------------------------------------
         |
         | Want to automatically trigger your PHPUnit tests. Not a problem.
         | This object stores your default PHPUnit directory path. For a
         | custom command, you may use the second arg to mix.phpUnit.
         |
         */

        phpUnit: {
            path: 'tests'
        },

        /*
         |----------------------------------------------------------------
         | PHPSpec Autotesting
         |----------------------------------------------------------------
         |
         | Want to automatically trigger your PHPSpec tests. Not a problem.
         | This object stores your default PHPSpec directory path. For a
         | custom command, you may use the second arg to mix.phpSpec.
         |
         */

        phpSpec: {
            path: 'spec'
        }
    },

    /*
     |----------------------------------------------------------------
     | File Versioning
     |----------------------------------------------------------------
     |
     | If you use aggressive assets caching on your server, then you
     | will need a way to cachebust, right? No querystring needed
     | this time. Here you may set the default "build" folder.
     |
     */

    versioning: {
        buildFolder: 'build'
    },

    /*
     |----------------------------------------------------------------
     | Browsersync
     |----------------------------------------------------------------
     |
     | Want to have your browser refresh instantly upon changing a bit
     | of Sass or modifying a view? With Flixir, it has never been
     | easier. This contains default options for the extension.
     |
     */

    browserSync: {
        // http://www.browsersync.io/docs/options/
        reloadOnRestart : true,
        notify: true,
        server: {
            baseDir: 'public'
        }
    }

};

/**
 * Fetch a config item, using a string dot-notation.
 *
 * @param  {string} path
 * @return {string}
 */
config.get = function(path) {
    var basePath;
    var current = config;

    var segments = path.split('.');

    // If the path begins with "assets" or "public," then
    // we can assume that the user wants to prefix the
    // given base url to their config path. Useful!

    if (segments[0] == 'assets' || segments[0] == 'public') {
        basePath = config[segments.shift()+'Path'];
    }

    segments.forEach(segment => current = current[segment]);

    return p.join(basePath, current);
};

export default config;
