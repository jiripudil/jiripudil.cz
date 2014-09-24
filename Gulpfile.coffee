gulp = require 'gulp'
loadPlugins = require 'gulp-load-plugins'
plugins = loadPlugins()


gulp.task 'bower', () ->
	plugins.bower()

gulp.task 'less', () ->
	gulp.src 'www/static/css/*.less'
		.pipe plugins.sourcemaps.init()
		.pipe plugins.less
			paths: ['bower_components']
			cleancss: yes
		.pipe plugins.autoprefixer
			browsers: ['last 2 versions', 'ie >= 8']
			cascade: no
		.pipe plugins.sourcemaps.write()
		.pipe gulp.dest 'www/static/css'

gulp.task 'watch', () ->
	gulp.watch 'www/static/css/*.less', ['less']
