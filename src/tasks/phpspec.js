import Flixir from './../';
import runTests from './shared/Tests.js';

const config = Flixir.config;

/*
 |----------------------------------------------------------------
 | PHPSpec Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire PHPUnit test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It works great with your tdd task.
 |
 */

Flixir.extend('phpSpec', function(src, command) {
    runTests(
        'PHPSpec',
        src || (config.testing.phpSpec.path + '/**/*Spec.php'),
        command || 'vendor/bin/phpspec run'
    );
});
