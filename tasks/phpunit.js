var Flixir = require('../index');
var runTests = require('./shared/Tests');

var config = Flixir.config;


/*
 |----------------------------------------------------------------
 | PHPUnit Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire PHPUnit test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It's works great with the tdd task.
 |
 */

Flixir.extend('phpUnit', function(src, options) {
    runTests({
        name: 'phpUnit',
        src: src || (config.testing.phpUnit.path + '/**/*Test.php'),
        plugin: Flixir.Plugins.phpunit,
        pluginOptions: options || config.testing.phpUnit.options
    });
});
