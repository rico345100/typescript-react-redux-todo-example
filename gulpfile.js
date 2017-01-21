"use strict";
const gulp = require('gulp');
const gutil = require('gulp-util');
const merge = require('merge2');

const persistify = require('persistify');
const watchify = require('watchify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');

const browserSync = require('browser-sync').create();


function swallowError (error) {
	console.log(error.toString());
	this.emit('end');
}

function buildHtml() {
	return gulp.src('./src/html/index.html')
	.pipe(gulp.dest('./build'));
}

function buildScript() {
	let opts = Object.assign({}, watchify.args, { debug: true });
	let b = watchify(persistify(opts))
	.add('./src/ts/index.tsx')
	.on('update', bundle)
	.on('log', gutil.log)
	.plugin(tsify, {
		jsx: 'react'
	});

	function bundle() {
		return b.bundle()
		.on('error', swallowError)
		.on('end', () => {
			browserSync.reload();
		})
		.pipe(source('index.js'))
		.pipe(gulp.dest('./build'));
	}

	return bundle();
}

function buildCss() {
	return gulp.src('./src/css/app.css')
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
}

gulp.task('default', () => {
	browserSync.init({
		server: './build'
	});
	
	gulp.watch('./src/html/**.html', buildHtml);
	gulp.watch('./src/css/**.css', buildCss);

	gulp.watch('./build/index.html').on('change', browserSync.reload);

	return merge([
		buildHtml(),
		buildScript(),
		buildCss()
	]);
});