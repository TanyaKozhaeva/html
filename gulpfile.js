var gulp = require('gulp'),
    pug = require('gulp-pug'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    stylus = require('gulp-stylus'),
    sass = require('gulp-sass'),
    cache = require('gulp-cache'),
    spritesmith = require("gulp.spritesmith"),
    debug = require('gulp-debug'),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    newer = require("gulp-newer"),
    autoprefixer = require('gulp-autoprefixer'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');


// SASS
gulp.task('sass', function() {
    
    return gulp.src([
        //.pipe(debug({title: 'sass:'}))
            'dev/main/main.sass',
        ])
        .pipe(plumber())
        .pipe(sass({
            'include css': true
        }))


    .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(autoprefixer(['last 2 version']))
        .pipe(gulp.dest('dev/main/css'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

// Pug
gulp.task('pug', function() {
    
    return gulp.src('dev/main/index.pug')
        .pipe(debug({title: 'pug:'}))
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(gulp.dest('dev'));
});

// Browsersync
gulp.task('browsersync', function() {
    browsersync({
        server: {
            baseDir: 'dev'
        },
    });
});

// JS
gulp.task('scripts', function() {
    return gulp.src([
            // Библиотеки
            'dev/static/libs/jquery.mask.min.js',
            'dev/static/libs/jquery.nicescroll.js',
            'dev/static/libs/validate/jquery.validate.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dev/static/js'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

// Сборка спрайтов SVG
/*gulp.task('svg', function () {
    return gulp.src('dev/static/img/svg/*.svg')
    .pipe(debug({title: 'svg:'}))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "dev/static/img/sprite/sprite.svg",
                    render: {
                        sass: {
                            dest:'dev/static/sass/_sprite.sass',
                            template: "dev/static/sass/modules/_sprite-template.sass"
                        }
                    }
                }
            }
        }))
});
*/

gulp.task('svg', function () {
    return gulp.src('dev/static/img/svg/*.svg')
    .pipe(debug({title: 'svg:'}))
        // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill and style declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');//
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        // cheerio plugin create unnecessary string '>', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
                mode:{
                    symbol: {
                        sprite: "sprite.svg"
                    }
                }
        }))
        .pipe(gulp.dest('dev/static/img/svg/'));
});


// Сборка спрайтов PNG
gulp.task('cleansprite', function() {
    return del.sync('dev/static/img/sprite/sprite.png');
});


gulp.task('spritemade', function() {
    var spriteData =
        gulp.src('dev/static/img/sprite/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.styl',
            padding: 15,
            cssFormat: 'sass',
            algorithm: 'binary-tree',
            cssTemplate: 'stylus.template.mustache',
            cssVarMap: function(sprite) {
                sprite.name = 's-' + sprite.name;
            }
        }));

    spriteData.img.pipe(gulp.dest('dev/static/img/sprite/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('dev/static/sass/')); // путь, куда сохраняем стили
});
gulp.task('sprite', ['cleansprite', 'spritemade']);


// Слежение
gulp.task('watch', ['browsersync', 'sass', 'scripts'], function() {
    gulp.watch('dev/main/**/*.sass', ['sass']);
    gulp.watch('dev/main/**/*.pug', ['pug']);
    gulp.watch('dev/*.html', browsersync.reload);
    gulp.watch(['dev/static/js/*.js', '!dev/static/js/libs.min.js', '!dev/static/js/jquery.js'], ['scripts']);
});

// Очистка папки сборки
gulp.task('clean', function() {
    return del.sync('prodact');
});

// Оптимизация изображений
gulp.task('img', function() {
    return gulp.src(['dev/static/img/**/*', '!dev/static/img/sprite/*'])
        .pipe(cache(imagemin({
            progressive: true,
            use: [pngquant()]

        })))
        .pipe(gulp.dest('product/static/img'));
});

// Сборка проекта

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
    var buildCss = gulp.src('dev/main/css/*.css')
        .pipe(gulp.dest('product/static/css'));

    var buildFonts = gulp.src('dev/static/fonts/**/*')
        .pipe(gulp.dest('product/static/fonts'));

    var buildJs = gulp.src('dev/static/js/**.js')
        .pipe(gulp.dest('product/static/js'));

    var buildHtml = gulp.src('dev/*.html')
        .pipe(gulp.dest('product/'));

    var buildImg = gulp.src('dev/static/img/sprite/sprite.png')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('product/static/img/sprite/'));
});

// Очистка кеша
gulp.task('clear', function() {
    return cache.clearAll();
});

// Дефолтный таск
gulp.task('default', ['watch']);
