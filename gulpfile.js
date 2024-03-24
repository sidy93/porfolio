const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync   = require('browser-sync').create();

var paths = {
    root: { 
        www:        './'
    },
    src: {
        root:       'assets',
        html:       '/**/*.html',
        css:        '/assets/css/*.css',
        js:         '/assets/js/*.js',
        vendors:    '/assets/vendors/**/*.*',
        imgs:       '/assets/imgs/**/*.+(png|jpg|gif|svg)',
        scss:       '/assets/scss/**/*.scss'
    },
    dist: {
        root:       '/dist',
        css:        '/dist/css',
        js:         '/dist/js',
        imgs:       '/dist/imgs',
        vendors:    '/dist/vendors'
    }
    
}

gulp.task('sass', function() {
    return gulp.src(paths.src.scss)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) 
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.src.root + '/css'))
    .pipe(browserSync.stream());
    
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: paths.root.www
        } 
    })
    gulp.watch(paths.src.scss, gulp.series('sass'));
    gulp.watch(paths.src.js).on('change', browserSync.reload);
    gulp.watch(paths.src.html).on('change', browserSync.reload);
});
