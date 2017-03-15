
var ghpages = require('gh-pages');
var gulp = require('gulp');
var path = require('path');
var exec = require('child_process').exec;

gulp.task('ejemplo_manejo', function() {
	var child = exec('node ./src/manejo_de_cookies_express.js', function(error, stdout, stderr) {

		if (error) {
 		   console.error(`exec error: ${error}`);
    		   return;
 		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
});

gulp.task('ejemplo_cookie-module', function() {
	var child = exec('node ./src/ejemplo_cookie-module', function(error, stdout, stderr) {

		if (error) {
 		   console.error(`exec error: ${error}`);
    		   return;
 		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
});

gulp.task('ejemplo1_cookie-session', function() {
	var child = exec('node ./src/ejemplo1_cookie-session', function(error, stdout, stderr) {

		if (error) {
 		   console.error(`exec error: ${error}`);
    		   return;
 		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
});

gulp.task('ejemplo2_cookie-session', function() {
	var child = exec('node ./src/ejemplo2_cookie-session', function(error, stdout, stderr) {

		if (error) {
 		   console.error(`exec error: ${error}`);
    		   return;
 		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
});

gulp.task('ejemplo3_cookie_session', function() {
	var child = exec('node ./src/ejemplo3_cookie_session', function(error, stdout, stderr) {

		if (error) {
 		   console.error(`exec error: ${error}`);
    		   return;
 		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
});

gulp.task('session_auth', function() {
	var child = exec('node ./src/session_auth', function(error, stdout, stderr) {

		if (error) {
 		   console.error(`exec error: ${error}`);
    		   return;
 		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
});

gulp.task('server', function() {
	var child = exec('node server', function(error, stdout, stderr) {

		if (error) {
 		   console.error(`exec error: ${error}`);
    		   return;
 		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
});

gulp.task('deploy', function() {
ghpages.publish(path.join(__dirname, '_book'), function(err) {
      console.log('publicado en gh-pages');
    });
  });
