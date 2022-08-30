document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
};

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagen'); 
    // con el document.querySelector es necesario escribir dentro de los parentesis con sintaxis de css

    for(let i = 1; i <= 12; i++){
        
        const imagen = document.createElement('picture');
        
             imagen.innerHTML = `
             <source srcset="build/img/thumb/${i}.avif" type="image/avif">
             <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen Vocalista Festival"  class="imagen galeria">
        `;
        
        imagen.onclick = function(){
            mostrarImagen(i);
        };

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i){
    const imagen = document.createElement('picture');
        
             imagen.innerHTML = `
             <source srcset="build/img/grande/${i}.avif" type="image/avif">
             <img loading="lazy" width="200" height="300" src="build/img/grande/${i}.jpg" alt="Imagen Vocalista Festival"  class="imagen">
        `; 
        
        // Crea el overlay para agregar la imagen

            const overlay = document.createElement('DIV');

            overlay.appendChild(imagen);
            overlay.classList.add('overlay');
            overlay.onclick = function(){
                const body = document.querySelector('body');
                body.classList.remove('fijar-body');
                overlay.remove();
            }

            // Boton para cerrar el Modal

            const cerrarModal = document.createElement('P');
            cerrarModal.textContent = ('X');
            cerrarModal.classList.add('btn-cerrar');
            cerrarModal.onclick = function(){
                
                const body = document.querySelector('body');
                body.classList.remove('fijar-body');
                overlay.remove();
            }
            overlay.appendChild(cerrarModal);

            // Añadimos el div y el picture al body
            const body = document.querySelector('body');
            body.appendChild(overlay);
            body.classList.add('fijar-body');
}



const target = document.querySelectorAll('[data-anime');

        function animeScroll(){
            const windowsTop = window.pageYOffset + ((window.innerHeight * 3) / 4) +130;
            target.forEach(function(e){
                if((windowsTop) > e.offsetTop){
                    e.classList.add('animate');
                }else{
                    e.classList.remove('animate');
                }
            })
        }
        window.addEventListener('scroll', function(){
            animeScroll();
        });