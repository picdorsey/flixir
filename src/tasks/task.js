import gulp from 'gulp';
import Flixir from './../';

/*
 |----------------------------------------------------------------
 | Custom Gulp Tasks
 |----------------------------------------------------------------
 |
 | Sometimes, you'll want to hook your custom Gulp tasks into
 | Flixir. Simple! Simply call Flixir's task() method, and
 | provide the name of your task, and a regex to watch.
 |
 */

Flixir.extend('task', function(name, watcher) {
    const task = new Flixir.Task('task', () => gulp.start(name));

    if (watcher) {
        task.watch(watcher);
    }
});
