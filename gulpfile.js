var gulp = require('gulp');
var tslint = require("gulp-tslint");
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var Server = require('karma').Server;
var del = require('del');
var gutil = require('gulp-util');
var sftp = require('gulp-sftp');
 
gulp.task('publish', function () {
    return gulp.src('dist/*')
        .pipe(sftp({
            host: '192.168.0.5',
            user: 'publish',
            pass: 'pub123!',
            remotePath: '/var/www/lashes'
        }));
});

gutil.log = gutil.noop;

gulp.task('release', function (callback) {
    runSequence(
        'tslint',
        'unit-test',
        'e2e-test',
        'clean',
        'ng-build',
        'publish',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});

gulp.task('clean', function(){
     return del('dist/**', {force:true});
});

gulp.task('ng-build', shell.task([
    'ng build -prod'
]));

gulp.task('unit-test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('e2e-test', shell.task([
    'npm run e2e'
]));

gulp.task("tslint", () =>
    gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
);