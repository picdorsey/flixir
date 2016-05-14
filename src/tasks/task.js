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

Flixir.extend('task', (name, watcher) => {
    const task = new Flixir.Task('task', (gulp) => gulp.start(name));

    watcher && task.watch(watcher);
});
