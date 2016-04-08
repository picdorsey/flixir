import fs from 'fs';
import _ from 'underscore';

/**
 * Flixir is a wrapper around Gulp.
 *
 * @param {Function} recipe
 */
const Flixir = function(recipe) {
    // Perform any last-minute initializations.
    init();

    // Load all of Flixir's task definitions.
    require('require-dir')('./tasks');

    // Load the user's Gulpfile recipe.
    recipe(Flixir.mixins);

    // And run their chosen tasks.
    Flixir.tasks.forEach(task => task.toGulp());
};

Flixir.mixins       = {};
Flixir.Log          = require('./Logger').default;
Flixir.GulpPaths    = require('./GulpPaths').default;
Flixir.config       = require('./Config').default;
Flixir.Plugins      = require('gulp-load-plugins')();
Flixir.Task         = require('./Task').default(Flixir);
Flixir.tasks        = new (require('./TaskCollection').default)();

/**
 * Perform any last-minute initializations.
 */
const init = function () {
    if (! Flixir.config.notifications) {
        process.env.DISABLE_NOTIFIER = true;
    }

    Flixir.Notification = require('./Notification').default;
};

/**
 * Register a new task with Flixir.
 *
 * @param {string}   name
 * @param {Function} callback
 */
Flixir.extend = function(name, callback) {
    Flixir.mixins[name] = function() {
        callback.apply(this, arguments);

        return this.mixins;
    }.bind(this);
};

/**
 * Allow for config overrides, via an Flixir.json file.
 *
 * @param {string} file
 */
Flixir.setDefaultsFrom = function(file) {
    let overrides;

    if (fs.existsSync(file)) {
        overrides = JSON.parse(fs.readFileSync(file, 'utf8'));

        _.mixin({
            deepExtend: require('underscore-deep-extend')(_)
        });

        _.deepExtend(Flixir.config, overrides);
    }
}('Flixir.json');

module.exports = Flixir;
