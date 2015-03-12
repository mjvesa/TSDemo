var gulp = require('gulp');
var ts = require('gulp-typescript');
gulp.task('default', function() {
    var tsResult = gulp.src('src/main/resources/**/*.ts')
                       .pipe(ts({
                           declarationFiles: true,
                           noExternalResolve: true,
                           module: "commonjs"
                       }));
    
    return tsResult.js.pipe(gulp.dest('target/TSDemo-0.0.1-SNAPSHOT/WEB-INF/classes'));
});