var gulp = require('gulp');
var exec = require('child_process').exec;

// push到github
gulp.task('push2git', function(end) {
    var cmd = 'git add .;git commit -m "Gulp deploy.";git pull origin;git push origin';
    exec(cmd, function(err, stdout) {
        if (err) {
            console.log('Git push:' + err);
        } else {
            console.log(stdout);
            end();
        }
    });
});