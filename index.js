var fs = require('fs');
var gulp = require('gulp');
var _ = require('underscore');
var gutils = require('gulp-util');


/**
 * Flixir is a wrapper around Gulp.
 *
 * @param {Function} recipe
 */
var Flixir = function(recipe) {
    // We'll start by loading all of the available tasks.
    require('require-dir')('./tasks');

    // The user may then choose which tasks they want.
    recipe(Flixir.mixins);

    // Now that the user has requested their desired tasks
    // from the Gulpfile, we'll initialize everything!
    createGulpTasks.call(Flixir);
};



Flixir.mixins       = {};
Flixir.Log          = require('./Logger');
Flixir.Notification = require('./Notification');
Flixir.GulpPaths    = require('./GulpPaths');
Flixir.config       = config = require('./Config');
Flixir.Task         = require('./Task')(Flixir);
Flixir.tasks        = config.tasks;
Flixir.Plugins      = require('gulp-load-plugins')();

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
    var overrides;

    if (fs.existsSync(file)) {
        overrides = JSON.parse(fs.readFileSync(file, 'utf8'));

        _.mixin({
            deepExtend: require('underscore-deep-extend')(_)
        });

        _.deepExtend(Flixir.config, overrides);
    }
}('Flixir.json');


/**
 * Create the actual Gulp tasks dynamically,
 * based upon the chosen Flixir mixins.
 */
var createGulpTasks = function() {
    var tasks = this.tasks;

    tasks.forEach(function(task) {
        if (_.contains(gulp.tasks, task.name)) return;

        gulp.task(task.name, function() {
            // If the user is running gulp watch or gulp *task from the
            // command line, then we'll trigger the current Gulp task
            // logic as many times as was requested in the Gulpfile.
            // Example: mix.sass('app.scss').sass('admin.scss').
            if (_.intersection(gutils.env._, [task.name, 'watch', 'tdd']).length) {
                return _.where(tasks, { name: task.name })
                    .forEach(function(task) {
                        task.run();
                    });
            }

            // On the other hand, if the user just triggered `gulp`,
            // then we can simply run the task, badabingbadaboom.
            var gulp = Flixir.Task.find(task.name).run();

            // This is a little tricky. With Flixir, a single Gulp task
            // can be triggered multiple times, with unique sets of
            // data - which you provide, when you do mix.task().

            // The kicker is that, when the Gulp task is triggered,
            // we must know which set of data you want to use. So
            // we increment an index each time the task is run.

            // The Task.find method will then, when called, properly
            // return the correct data that corresponds to the
            //  active index for the current task. Got it?
            Flixir.config.activeTasks[task.name]++;

            return gulp;
        });
    });
};

module.exports = Flixir;
