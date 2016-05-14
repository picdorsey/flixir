import gulp from 'gulp';
import Flixir from './../';

const batch = Flixir.Plugins.batch;
const $ = Flixir.Plugins;

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

gulp.task('watch', () => {
    initBrowserify();

    Flixir.hooks.watch.forEach(hook => hook());

    Flixir.tasks.forEach(task => {
        const batchOptions = Flixir.config.batchOptions;

        if (task.hasWatchers()) {
            $.watch(task.watchers, batch(batchOptions, (events) => {
                events.on('end', gulp.start(task.name));
            }));
        }
    });
});

/**
 * Determine if Browserify is included in the list.
 */
function initBrowserify() {
    if (Flixir.tasks.has('browserify')) {
        Flixir.config.js.browserify.watchify.enabled = true;

        gulp.start('browserify');
    }
};
