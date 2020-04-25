var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    stylus = require('gulp-stylus'); 

    // Where do you store your Sass files?
    var lessDir = 'less';

    // Which directory should LESS compile to?
    var targetCSSDir = 'css';
    

    gulp.task('stylus', function() {
        // Подаем на вход файл style.styl из папки source    
            gulp.src('stylus/stylus.styl')
          
                // Запускаем обработчик Stylus, в потоке — style.css        
                .pipe( stylus() )
                // Копируем файл style.css в папку dev      
                .pipe( gulp.dest('css/') );     
        });



    gulp.task('less', function () {
        return gulp.src(lessDir + '/*.less')
            .pipe(less({ style: 'compressed' }).on('error', gutil.log))
            //.pipe(autoprefix('last 10 version'))
            .pipe(gulp.dest(targetCSSDir))
            .pipe(notify('CSS minified'))
    });

 
gulp.task('sass', function() { // Создаем таск "sass"
	return gulp.src(['sass/**/*.sass', 'sass/**/*.scss']) // Берем источник
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gulp.dest('css')) // Выгружаем результата в папку css
    });
    


    gulp.task('watch', function () {
        gulp.watch(['sass/**/*.sass', 'sass/**/*.scss', 'less/**/*.less', 'stylus/**/*.styl'], gulp.series('sass', 'less', 'stylus')); // Наблюдение за sass файлами в папке sass
    });
    

 