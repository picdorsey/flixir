var gulp   = require('gulp');
var Flixir = require('../index');

var config = Flixir.config;
var runTests = require('./shared/Tests.js');


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
