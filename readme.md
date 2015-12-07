# Frunt "Flixir"

## Introduction

A fork of [Laravel Elixir](https://github.com/laravel/Elixir) used for our projects.

## Features
* Sass
* Browserify
* Autoprefixer

## Documentation

### Defaults

##### Assets Path: `flixir.config.assetsPath`
This assets path property is prefixed to all relevant assets

Default: `src`


##### Public Path `flixir.config.publicPath`
Much like assets path, this public path property is prefixed to any paths in your application, that point to the public dir. It's useful, when a server requires a unique public path.

Default: `public/assets`


##### Sass Source Folder `flixir.config.sass.folder`
Location of the SASS/SCSS Files

Default: `scss`


##### JS Source Folder `flixir.config.js.folder`
Location of the Javascript Files

Default: `scss`


### Running Flixir

##### Run all taks
`gulp`


##### Run all tasks and minify all CSS and Javascript
`gulp --production`


##### Watchin Assets For Changes
`gulp watch`


### Working With Sass

The sass method allows you to compile Sass into CSS. You may use the mthod like so:

```js
mix.sass('style.scss');
```

You may compile multiple Sass files into a single CSS file, and even customize the output directory of the resulting CSS:

```js
mix.sass([
   'style.scss',
   'style2.scss'
], 'public/assets/css');
});
```

### Working With Scripts

Functions to help you work with your JavaScript files, such as compiling ECMAScript 6, Browserify, minification, and simply concatenating plain JavaScript files

### Browserify

```js
mix.browserify('app.js');
```

### Scripts

Combine into a single file

```js
mix.scripts([
    'jquery.js',
    'app.js'
]);
```

If you need to combine all of the scripts in a given directory, you may use the `scriptsIn` method.

```js
mix.scriptsIn('src/js/vendor/');
```

### Copying Files and Directories

The copy method may be used to copy files and directories to new locations. All operations are relative to the project's root directory:

```js
mix.copy('vendor/foo/bar.css', 'public/css/bar.css');
mix.copy('vendor/package/views', 'resources/views');
```

### Versioning / Cache Busting

Append a unique hash to the filename, allowing for cache-busting. Ex: `style-1asddf35.css`

```js
mix.version('css/style.css');
```

### BrowserSync

BrowserSync automatically refreshes your web browser after you make changes to your front-end resources. You can use the browserSync method to instruct Flixir to start a BrowserSync server when you run the `gulp watch` command:

```js
mix.browserSync();

mix.browserSync({
	config: config
});
```
