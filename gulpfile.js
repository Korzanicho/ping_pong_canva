const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer  = require("gulp-autoprefixer");
const colors        = require("ansi-colors");
const notifier      = require("node-notifier");
const rename        = require("gulp-rename");
const csso          = require("gulp-csso");
const browserSync   = require("browser-sync").create();


const showError = function(err) {
	//console.log(err.toString()); //wypisze cały obiekt błędu w terminalu
	notifier.notify({
        title: "Error in sass",
        message: err.messageFormatted
    });

    console.log(colors.red("==============================="));
    console.log(colors.red(err.messageFormatted));
    console.log(colors.red("==============================="));
}

const server = function(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false, //reszta opcji z dokumentacji browsersync
        //host: "192.168.0.24",
        //port: 3000,
        open: true,
        //browser: "google chrome" //https://stackoverflow.com/questions/24686585/gulp-browser-sync-open-chrome-only
    });

    cb();
}

const sassCompile = function(){
	return gulp.src("./sass/main.sass")
	.pipe(sourcemaps.init())
	.pipe(
		sass({
			outputStyle : 'compressed'
		}).on("error", showError)
	)
	.pipe(autoprefixer()) //lista przeglądarek w pliku package.json
	.pipe(rename({ //zamieniam wynikowy plik na style.min.css
		suffix: ".min",
		basename: "style"
	}))
	.pipe(csso())
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("./css"))
	.pipe(browserSync.stream({match: "**/*.css"}));
}

const watch = function(){
	gulp.watch("./sass/**/*.sass", gulp.series(sassCompile));
	gulp.watch("./**/*.html").on("change", browserSync.reload);
	gulp.watch("./**/*.js").on("change", browserSync.reload);
}

exports.default = gulp.series(sassCompile, server, watch);
exports.sassCompile = sassCompile;
exports.watch = watch;