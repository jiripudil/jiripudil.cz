gulp = require 'gulp'
gutil = require 'gulp-util'
streamee = require 'streamee'
loadPlugins = require 'gulp-load-plugins'
plugins = loadPlugins()


gulp.task 'less', ->
	gulp.src 'www/static/css/*.less'
		.pipe plugins.plumber()
		.pipe plugins.less
			paths: ['bower_components']
			cleancss: yes
		.pipe plugins.autoprefixer
			browsers: ['last 2 versions', 'ie >= 10']
			cascade: no
		.on 'error', gutil.log
		.pipe plugins.plumber.stop()
		.pipe gulp.dest 'www/static/css'

gulp.task 'sass', ->
	gulp.src 'www/static/css/2017/index.scss'
		.pipe plugins.plumber()
		.pipe plugins.sass().on('error', plugins.sass.logError)
		.pipe plugins.autoprefixer
			browsers: ['last 2 versions', 'ie >= 10']
			cascade: no
		.on 'error', gutil.log
		.pipe plugins.plumber.stop()
		.pipe plugins.rename '2017.css'
		.pipe gulp.dest 'www/static/css'

gulp.task 'scripts', ->
	streamee.concatenate [
		gulp.src [
			'bower_components/jquery/dist/jquery.min.js'
			'bower_components/nette.ajax.js/nette.ajax.js'
			'bower_components/selectize/dist/js/standalone/selectize.min.js'
		]
		gulp.src 'www/static/js/*.coffee'
			.pipe plugins.plumber()
			.pipe plugins.coffee()
			.on 'error', gutil.log
			.pipe plugins.plumber.stop()
	]
	.pipe plugins.concat('scripts.js')
	.pipe plugins.uglify()
	.pipe gulp.dest 'www/static/js'

gulp.task 'watch', ->
	gulp.watch 'www/static/css/*.less', ['less']
	gulp.watch 'www/static/css/**/*.scss', ['sass']
	gulp.watch 'www/static/js/*.coffee', ['scripts']

gulp.task 'build', ['less', 'sass', 'scripts']
