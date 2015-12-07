var gulp = require('gulp');
var Flixir = require('../index');


/*
 |----------------------------------------------------------------
 | TDD Watcher
 |----------------------------------------------------------------
 |
 | This task will keep an eye on any tasks that are part of the
 | tdd category. By default this includes PHPUnit and PHPSpec
 | tests. Run `gulp tdd` and your tests will auto-trigger.
 |
 */

gulp.task('tdd', function() {
    new Flixir.Log.message('Watching for tests...');

    Flixir.tasks
        .filter(function(task) {
            return task.category == 'tdd';
        })
        .forEach(function(task) {
            gulp.watch(task.watchers, [task.name]);
        });
});
