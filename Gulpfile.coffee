gulp = require 'gulp'
loadPlugins = require 'gulp-load-plugins'
plugins = loadPlugins()


gulp.task 'bower', ->
	plugins.bower()

gulp.task 'less', ->
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

gulp.task 'coffee', ->
	gulp.src 'www/static/js/*.coffee'
		.pipe plugins.sourcemaps.init()
		.pipe plugins.coffee()
		.pipe plugins.sourcemaps.write()
		.pipe gulp.dest 'www/static/js'

gulp.task 'scripts', ['coffee'], ->
	gulp.src [
		'bower_components/jquery/dist/jquery.min.js'
		'bower_components/nette.ajax.js/nette.ajax.js'
		'bower_components/selectize/dist/js/standalone/selectize.min.js'
		'www/static/js/app.js'
	]
		.pipe plugins.sourcemaps.init()
		.pipe plugins.concat('scripts.js')
		.pipe plugins.uglify()
		.pipe plugins.sourcemaps.write()
		.pipe gulp.dest 'www/static/js'

gulp.task 'watch', ->
	gulp.watch 'www/static/css/*.less', ['less']
	gulp.watch 'www/static/js/*.coffee', ['scripts']

gulp.task 'build', ['bower', 'less', 'scripts']
