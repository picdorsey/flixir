import gulp from 'gulp';
import Flixir from './../';
import inSequence from 'run-sequence';

/*
 |----------------------------------------------------------------
 | Default Task
 |----------------------------------------------------------------
 |
 | This task will run when the developer executes "gulp" on the
 | command line. We'll use this configuration object to know
 | which tasks should be fired when this task is executed.
 |
 */

gulp.task('default', function() {
    const tasks = Flixir.tasks.names();

    Flixir.hooks.before.forEach(hook => hook());

    if (tasks.length) {
        inSequence.apply(this, tasks);
    }
});
