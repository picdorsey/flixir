var gulp = require('gulp');
var _ = require('underscore');
var batch = require('gulp-batch');
var Flixir = require('../index');

/*
 |----------------------------------------------------------------
 | Watcher
 |----------------------------------------------------------------
 |
 | When you want to keep an eye on your files for changes, and
 | then re-trigger Gulp, then you should use the gulp watch
 | command. This way, you can auto-compile on each save!
 |
 */

gulp.task('watch', function() {
    var tasks = _.sortBy(Flixir.tasks, 'name');
    var mergedTasks = {};

    if (isWatchingBrowserify(tasks)) {
        Flixir.config.js.browserify.watchify.enabled = true;

        gulp.start('browserify');
    }

    tasks.forEach(function(task) {
        if (task.name in mergedTasks) {
            return mergedTasks[task.name].watchers = _.union(mergedTasks[task.name].watchers, task.watchers);
        }

        mergedTasks[task.name] = {
            name: task.name,
            watchers: Array.isArray(task.watchers) ? task.watchers : [task.watchers]
        };
    });

    _.sortBy(mergedTasks, 'name').forEach(function(task) {
        if (task.watchers.length > 0) {
            gulp.watch(task.watchers, batch(Flixir.config.batchOptions, function(events) {
                events.on('end', gulp.start(task.name));
            }));
        }
    });
});


/**
 * Determine if Browserify is included in the list.
 *
 * @param  {object} tasks
 * @return {Boolean}
 */
var isWatchingBrowserify = function(tasks) {
    return _.contains(_.pluck(tasks, 'name'), 'browserify');
};
