var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var should = require('chai').should();
var Flixir = require('../../index');


describe('Sass Task', function() {

    beforeEach(() => {
        Flixir.tasks = Flixir.config.tasks = [];
    });

    it('compiles Sass files to the public/css directory', done => {
        Flixir(mix => mix.sass('app.scss'));

        runGulp(() => {
            shouldExist('./public/assets/css/app.css');

            done();
        });
    });

    it('creates sourcemaps for compiled Sass files', done => {
        Flixir(mix => mix.sass('app.scss'));

        runGulp(() => {
            shouldExist('./public/assets/css/app.css.map');

            done();
        });
    });


    it('compiles to the source file name, if a single file is given', done => {
        Flixir(mix => mix.sass('another.scss'));

        runGulp(() => {
            shouldExist('./public/assets/css/another.css');

            done();
        });
    });


    it('compiles to a custom directory and file name', done => {
        Flixir(mix => mix.sass(['app.scss', 'another.scss'], './public/assets/css/done.css'));

        runGulp(() => {
            shouldExist('./public/assets/css/done.css');

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
    });
};
