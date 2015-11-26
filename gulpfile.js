var gulp = require('gulp');
var exec = require('child_process').exec;

// push到github
gulp.task('push', function(end) {
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

gulp.task('deploy', function(end) {
	var cmd = 'scp -r /Users/hello13/Documents/Proj/combo/* root@43.241.219.90:/root/proj/combo';
    exec(cmd, function(err, stdout) {
        if (err) {
            console.log('Git push:' + err);
        } else {
            console.log(stdout);
            end();
        }
    });
});