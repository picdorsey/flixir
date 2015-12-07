var Flixir = require('../index');
var runTests = require('./shared/Tests');

var config = Flixir.config;


/*
 |----------------------------------------------------------------
 | PHPSpec Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire PHPSpec test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It's works great with the tdd task.
 |
 */

Flixir.extend('phpSpec', function(src, options) {
    runTests({
        name: 'phpSpec',
        src: src || (config.testing.phpSpec.path + '/**/*Spec.php'),
        plugin: Flixir.Plugins.phpspec,
        pluginOptions: options || config.testing.phpSpec.options
    });
});
