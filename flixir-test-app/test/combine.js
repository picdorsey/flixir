var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var should = require('chai').should();
var Flixir = require('../../src/');

describe('Combine Task', function() {

    beforeEach(() => {
        Flixir.tasks.empty();
    });

    it('combines a given array of files.', done => {
        Flixir(mix => mix.combine([
            './src/js/lib1.js',
            './src/js/lib2.js'
        ], './public/js/combined.js'));

        runGulp(() => {
            shouldExist('./public/js/combined.js');

            fs.readFileSync('./public/js/combined.js', { encoding: 'utf8' })
                .should.equal('var somelib;\nvar anotherlib;');

            done();
        });
    });

    it('allows for an optional base directory', done => {
        Flixir(mix => mix.combine([
            'js/lib1.js',
            'js/lib2.js'
        ], './public/js/combined.js', 'src/'));

        runGulp(() => {
            shouldExist('./public/js/combined.js');

            fs.readFileSync('./public/js/combined.js', { encoding: 'utf8' })
                .should.equal('var somelib;\nvar anotherlib;');

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

        remove.sync('./public');
    });
};
