const { src, dest, series, parallel, watch } = require("gulp");
const del = require("del");
const browserSync = require("browser-sync");
const sass = require("gulp-dart-sass");
const babel = require("gulp-babel");
const concatenate = require("gulp-concat");
const webp = require("gulp-webp");

const origin = "src";
const destination = "build";

sass.compiler = require("node-sass");

async function clean(cb) {
	await del(destination);
	cb();
}

function html(cb) {
	src(`${origin}/**/*.html`).pipe(dest(destination));
	cb();
}

async function images(cb) {
	src(`${origin}/img/*`)
		.pipe(webp())
		.pipe(dest(`${destination}/img`));
	src(`${origin}/img/favicon/*`).pipe(dest(`${destination}/img/favicon`));
	cb();
}

function scss(cb) {
	src(`${origin}/scss/**/*.scss`)
		.pipe(sass({ outputStyle: "compressed" }))
		.pipe(dest(`${destination}/css`));
	cb();
}
function webfonts(cb) {
	src(`${origin}/webfonts/**/**`).pipe(dest(`${destination}/webfonts`));
	cb();
}

function js(cb) {
	src(`${origin}/js/lib/**/*.js`).pipe(dest(`${destination}/js/lib`));
	src(`${origin}/js/script.js`)
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(dest(`${destination}/js`));
	cb();
}

function watcher(cb) {
	watch(`${origin}/**/*.html`).on("change", series(html, browserSync.reload));
	watch(`${origin}/**/*.scss`).on("change", series(scss, browserSync.reload));
	watch(`${origin}/**/*.js`).on("change", series(js, browserSync.reload));
	cb();
}

function server(cb) {
	browserSync.init({
		notify: false,
		open: false,
		server: { baseDir: destination },
	});
	cb();
}

exports.html = html;
exports.scss = scss;
exports.js = js;
exports.default = series(clean, parallel(html, scss, js, webfonts), images, server, watcher);
