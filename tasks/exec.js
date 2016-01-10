var gulp    = require('gulp');
var Flixir = require('../index');

/*
 |----------------------------------------------------------------
 | Shell Commands
 |----------------------------------------------------------------
 |
 | Need to execute a shell script, as part of your compile
 | process? No problem. Flixir can help with that. Just
 | call `mix.exec('command')`, and, bam, you're set!
 |
 */

Flixir.extend('exec', function(command, watcher) {
    var task = new Flixir.Task('exec', function() {
        Flixir.Log
            .heading('Triggering Command...')
            .message(command);

        return (
            gulp
            .src('')
            .pipe(Flixir.Plugins.shell(command))
        );
    });

    if (watcher) {
        task.watch(watcher);
    }
});

