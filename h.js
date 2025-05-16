document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});

 
                document.addEventListener('DOMContentLoaded', function() {
    const fotos = document.querySelectorAll('.fotos img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    // Mostrar la primera imagen
    fotos[currentIndex].classList.add('active');

    // Función para mostrar imagen actual
    function showImage(index) {
        fotos.forEach(img => img.classList.remove('active'));
        fotos[index].classList.add('active');
    }

    // Evento para botón siguiente
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % fotos.length;
        showImage(currentIndex);
    });

    // Evento para botón anterior
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + fotos.length) % fotos.length;
        showImage(currentIndex);
    });

    // Opcional: Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        }
    });
});


            




