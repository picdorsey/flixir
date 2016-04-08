import gulp from 'gulp';
import Flixir from './../';

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
        .filter(task => task.category == 'tdd')
        .forEach(task => gulp.watch(task.watchers, [task.name]));
});
