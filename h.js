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



document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const closeBtn = document.querySelector('.close-btn');
    const productCards = document.querySelectorAll('.card-product');
    const categories = document.querySelectorAll('.categoria');
    const galleryImages = document.querySelectorAll('.galeria img');

    // Función para normalizar texto (eliminar acentos y poner en minúsculas)
    function normalizeText(text) {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    // Función para remover todos los resaltados
    function removeAllHighlights() {
        document.querySelectorAll('.search-highlighted').forEach(element => {
            element.classList.remove('search-highlighted');
        });
        hideNoResultsMessage();
    }

    // Función para realizar la búsqueda
    function performSearch() {
        const searchTerm = normalizeText(searchInput.value.trim());
        
        // Limpiar resaltados anteriores
        removeAllHighlights();
        
        if (searchTerm === '') {
            return;
        }

        let foundResults = false;

        // Buscar en productos
        productCards.forEach(card => {
            const titleElement = card.querySelector('.product-title h3');
            const title = normalizeText(titleElement.textContent);
            
            if (title.includes(searchTerm)) {
                card.classList.add('search-highlighted');
                foundResults = true;
            }
        });

        // Buscar en categorías
        categories.forEach(category => {
            const titleElement = category.querySelector('.categoria-titulo');
            const title = normalizeText(titleElement.textContent);
            
            if (title.includes(searchTerm)) {
                category.classList.add('search-highlighted');
                foundResults = true;
            }
        });

        // Buscar en galería (solo si tiene atributo alt)
        galleryImages.forEach(img => {
            if (img.alt) {
                const altText = normalizeText(img.alt);
                
                if (altText.includes(searchTerm)) {
                    img.classList.add('search-highlighted');
                    foundResults = true;
                }
            }
        });

        // Mostrar mensaje si no hay resultados
        if (!foundResults) {
            showNoResultsMessage(searchTerm);
        }
    }

    // Función para mostrar mensaje de no resultados
    function showNoResultsMessage(term) {
        hideNoResultsMessage(); // Limpiar mensajes anteriores
        
        const message = document.createElement('div');
        message.id = 'no-results-message';
        message.innerHTML = `No se encontraron resultados para: <strong>"${term}"</strong>`;
        message.style.cssText = `
            text-align: center;
            padding: 1rem;
            margin: 1rem 0;
            color: #666;
        `;
        
        // Insertar después del formulario de búsqueda
        document.querySelector('.form').insertAdjacentElement('afterend', message);
    }

    // Función para ocultar mensaje de no resultados
    function hideNoResultsMessage() {
        const existingMessage = document.getElementById('no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    // Event listeners
    searchInput.addEventListener('input', function() {
        performSearch();
    });

    closeBtn.addEventListener('click', function() {
        searchInput.value = '';
        removeAllHighlights();
    });

    // También limpiar cuando el campo pierde el foco y está vacío
    searchInput.addEventListener('blur', function() {
        if (searchInput.value === '') {
            removeAllHighlights();
        }
    });
});

// Añadir estilos para el resaltado
const style = document.createElement('style');
style.textContent = `
    .search-highlighted {
        position: relative;
        z-index: 1;
    }
    
    .search-highlighted::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border: 2px solid #ffeb3b;
        border-radius: 4px;
        box-shadow: 0 0 8px rgba(255, 235, 59, 0.6);
        z-index: -1;
        animation: highlight-pulse 1.5s infinite;
    }
    
    @keyframes highlight-pulse {
        0% { border-color: #ffeb3b; box-shadow: 0 0 8px rgba(255, 235, 59, 0.6); }
        50% { border-color: #ffc107; box-shadow: 0 0 12px rgba(255, 193, 7, 0.8); }
        100% { border-color: #ffeb3b; box-shadow: 0 0 8px rgba(255, 235, 59, 0.6); }
    }
    
    /* Para las tarjetas de producto */
    .card-product.search-highlighted {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
    }
    
    /* Para las categorías */
    .categoria.search-highlighted .categoria-imagen-container {
        border: 2px solid #ffeb3b;
    }
    
    /* Para imágenes de galería */
    .galeria img.search-highlighted {
        box-shadow: 0 0 0 3px #ffeb3b;
    }
`;
document.head.appendChild(style);




