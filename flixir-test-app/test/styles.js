var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var should = require('chai').should();
var Flixir = require('../../src/');


describe('Styles Task', function() {

    beforeEach(() => {
        Flixir.tasks.empty();
    });

    it('merges stylesheets together', function(done) {
        Flixir(mix => mix.styles(['one.css', 'two.css']));

        runGulp(() => {
            shouldExist('public/assets/css/all.css');

            done();
        });
    });

    it('merges to any file the user wishes', function(done) {
        Flixir(mix => mix.styles(['one.css', 'two.css'], './public/assets/css/merged.css'));

        runGulp(() => {
            shouldExist('public/assets/css/merged.css');

            done();
        });
    });

    it('applies a custom base directory', function(done) {
        Flixir(mix => {
            // We'll copy files over to a custom directory to test this.
            mix.copy('./src/css', './src/styles');

            mix.styles(['one.css', 'two.css'], null, './src/styles');
        });

        runGulp(() => {
            shouldExist('public/assets/css/all.css');

            done();
        });
    });

});


var shouldExist = (file) => {
    return fs.existsSync(file).should.be.true;
};


var runGulp = assertions => {
    gulp.start('default', () => {
        assertions();

        remove.sync('./public/css');
        remove.sync('./src/styles');
    });
};
