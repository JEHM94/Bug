
// function tarea(done){
//     console.log('Mi primera tarea');

//     done();
// }// en npm es buena practica cerrar las "tareas" con otra funcion "vacia" la puedes llamar callback o done para hacer referencia

// exports.tarea = tarea; // "exports" es codigo nota.js en este caso estamos llamando a la funcion "primeraTarea" a la cual le asignamos el valor de la funcion "tarea"

const { src, dest, watch, parallel } = require("gulp"); 
// Con "require" estamos mandando a llamar a "gulp" desde donde este para usarlo el cual nos facilita la opcion de identificar el archivo y la de almacenar en el disco duro, la compilacion la hacemos con las dependencias en json


// CSS

const sass = require("gulp-sass")(require('sass'));
// para llamar de json a gulp-sass usamos el require
// el ultimo require es necesario en la sintaxis para especificar que llamamos todo el conocimiento de "sass"

const pumbler = require("gulp-plumber");

// Edicion de Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    
    src("src/scss/**/*.scss")// Identificar el archivo de SASS
        .pipe(pumbler())
        .pipe(sass()) // Compilarlo
        .pipe(dest("build/css")); // Almacenar en el disco duro

    // con la sintaxsis "/**/*" hacemos que busque todos los archivos con la extension scss dentro de esas carpetas

    // un pipe es una tarea que se ejecuta despues de otra, puedo tener varios pipe en una sola linea de codigo, en este caso "src" me identifica el archivo, luego uso el primer pipe para llamar a "sass" que me compila el archivo scss a css y al final uso mas un pipe para almacenar al archivo compilado css en el disco duro

   done();
}

function versionWebp() {
    
     const opciones = {
        quality: 50
     };
    
     // En caso de tener varios formatos para seleccionar en el src, lo hacemos con llaves "{}"
     return src("src/img/**/*.jpg").pipe( webp( opciones ) ).pipe( dest("build/img") );
}

// const gulp = require('gulp');
// const webp = require('gulp-webp');

// gulp.task( () =>
//     gulp.src('src/image.jpg')
//         .pipe(webp())
//         .pipe(gulp.dest('build/img'))

// );

function versionAvif(done) {
    
    const opciones = {
        quality: 50
    };
    
    // En caso de tener varios formatos para seleccionar en el src, lo hacemos con llaves "{}"
    src("src/img/**/*.{png,jpg}")
    .pipe( avif( opciones ) )
    .pipe( dest("build/img") );

    done();
}

function imagenes(done){

    const opciones = {
        optimizationLevel: 3
    }

    src('src/scss/img/**/*.{png,jpg}')
        .pipe( cache(imagemin(opciones) ) )
        .pipe( dest('build/img' ) )

    done();
}


function javascript(done){
    src('src/js/**/*.js')
    .pipe(dest('build/js'));

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript)
    // el watch toma el primer valor como el que va a escuchar y el segundo lo que hara despues de escucharlo
    
    // con la sintaxsis "/**/*" hacemos que busque todos los archivos con la extension scss dentro de esas carpetas
    done();
}

//exports.css = css; //recordatorio, esta linea es codigo node para llamar a la funcion y correrla en la terminal

// gulp por defecto no tiene la capacidad de mandar a llamar el compilador "sass" por eso debemos instalar un plugin de gulp desde la terminal para conectarse con sass

//"gulp" nos permite automatizar tareas entre otras cosas
//"sass" tiene todo el conocimiento sobre "sass" identifica que es una sintaxsis validad y la va a compilar
// y "gulp-sass" conecta "gulp" con "sass"

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.webp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(javascript ,dev); // con parallel las funciones se activan paralelamente

//recordatorio, npx gulp y el nombre de la funcion y npm run y el nombre de la funcion en el apartado de "scripts"