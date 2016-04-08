var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var Flixir = require('../../src/');


describe('Scripts Task', function() {

    beforeEach(() => {
        Flixir.tasks.empty();
    });

    it('merges scripts together', function(done) {
        Flixir(mix => mix.scripts(['lib1.js', 'lib2.js']));

        runGulp(() => {
            shouldExist('public/assets/js/all.js');

            done();
        });
    });

    it('merges to any file the user wishes', function(done) {
        Flixir(mix => mix.scripts(['lib1.js', 'lib2.js'], './public/assets/js/merged.js'));

        runGulp(() => {
            shouldExist('public/assets/js/merged.js');

            done();
        });
    });

    it('applies a custom base directory', function(done) {
        Flixir(mix => {
            // We'll copy files over to a custom directory to test this.
            mix.copy('./src/js', './src/scripts');

            mix.scripts(['lib1.js', 'lib2.js'], null, './src/scripts');
        });

        runGulp(() => {
            shouldExist('public/assets/js/all.js');

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

        remove.sync('./public/js');
        remove.sync('./resources/assets/scripts');
    });
};
