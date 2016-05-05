/// <binding AfterBuild='run' Clean='clean' />
var gulp = require("gulp"),
    project = require("./project.json"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    less = require("gulp-less"),
    cssmin = require("gulp-cssmin"),
    rename = require("gulp-rename"),
    htmlmin = require("gulp-htmlmin");

var paths = { root: "./" + project.webroot + "/" }
paths.www_lib = paths.root + "lib/";
paths.www_img = paths.root + "img/";
paths.www_css = paths.root + "css/";
paths.www_lib_css = paths.root + "lib/css/";
paths.www_lib_fonts = paths.root + "lib/fonts/";
paths.www_app = paths.root + "app/";

gulp.task("vendor:js", function () {
    return gulp.src([
        "node_modules/es6-shim/es6-shim.min.js",
        "node_modules/es6-shim/es6-shim.map",
        "node_modules/systemjs/dist/system-polyfills.js",
        "node_modules/angular2/es6/prod/src/testing/shims_for_IE.js",
        "node_modules/angular2/bundles/angular2-polyfills.js",
        "node_modules/angular2/bundles/http.dev.js",
        "node_modules/systemjs/dist/system.js",
        "node_modules/rxjs/bundles/rx.js",
        "node_modules/angular2/bundles/angular2.dev.js",
        "node_modules/angular2/bundles/router.dev.js",
        "node_modules/bootstrap/dist/js/bootstrap.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/crypto-js/aes.js",
        "node_modules/angular2-uuid/index.js",
        "node_modules/cryptico/lib/cryptico.js"
    ]).pipe(gulp.dest(paths.www_lib));
});

gulp.task("vendor:css", function () {
    return gulp.src([
        "node_modules/bootstrap/dist/css/bootstrap.min.css"
    ]).pipe(gulp.dest(paths.www_lib_css));
});

gulp.task("vendor:fonts", function () {
    return gulp.src([
        "node_modules/bootstrap/dist/fonts/*.*"
    ]).pipe(gulp.dest(paths.www_lib_fonts));
});

gulp.task("app:img", function () {
    return gulp.src([
        "App/Img/**/*.*"
    ]).pipe(gulp.dest(paths.www_img));
});

//Application
gulp.task("app:html", function () {
    return gulp.src(["App/**/*.html"])
    //.pipe(htmlmin({ collapseWhitespace: false })) todo: LIB FÖR ATT MINIFIERA HTM FILER!?!?!
    .pipe(gulp.dest(paths.www_app));
});

gulp.task("app:index:html", function () {
    return gulp.src(["App/index.html"])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.root));
});

gulp.task("app:less", function () {
    return gulp.src(["App/less/site.less"])
    .pipe(less({ 'sourcemap=none': true }))
    .pipe(cssmin())
    .pipe(rename("bundle.css"))
    .pipe(gulp.dest(paths.www_css));
});

gulp.task("vendor_tasks", ["vendor:js", "vendor:css", "vendor:fonts"]);
gulp.task("app_tasks", ["app:html", "app:less", "app:index:html", "app:img"]);
gulp.task("run", ["vendor_tasks", "app_tasks"]);

gulp.task("clean", function () {
    return gulp.src([paths.www_app, paths.www_lib, paths.www_css], { read: false }).pipe(clean());
});