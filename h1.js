// Variables globales
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedSize = null;

// Función para mostrar imágenes
function showImage(imageNumber) {
    const mainImages = document.querySelectorAll('.main-image');
    mainImages.forEach(img => img.classList.remove('active'));
    document.getElementById(`mainImage${imageNumber}`).classList.add('active');
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === imageNumber - 1);
    });
}

// Función para actualizar el carrito
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.querySelector('.total-amount');
    let totalAmount = 0;
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        totalAmount += item.price;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} MXN</div>
            </div>
            <div class="remove-item" data-index="${index}">&times;</div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    totalAmountElement.textContent = `$${totalAmount.toFixed(2)} MXN`;
    updateCartCounters();
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar contadores
function updateCartCounters() {
    const counters = document.querySelectorAll('.cart-count, .quantity');
    counters.forEach(counter => {
        counter.textContent = cart.length;
    });
}

// Evento cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const overlay = document.querySelector('.overlay');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const paymentModal = document.querySelector('.payment-modal');
    const confirmBtn = document.querySelector('.confirm-btn');
    
    // Inicializar carrito
    updateCart();
    
    // Evento para cambios en otras pestañas
    window.addEventListener('storage', function(event) {
        if (event.key === 'cart') {
            cart = JSON.parse(event.newValue) || [];
            updateCart();
        }
    });
    
    // Seleccionar talla
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedSize = this.dataset.size;
        });
    });
    
    // Abrir/cerrar carrito
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
        overlay.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    overlay.addEventListener('click', () => {
        cartModal.classList.remove('active');
        overlay.classList.remove('active');
        paymentModal.style.display = 'none';
    });
    
    // Agregar al carrito
    addToCartBtn.addEventListener('click', function() {
        if (!selectedSize) {
            alert('Por favor selecciona una talla');
            return;
        }
        
        const productName = document.querySelector('.product-title').textContent;
        const productPrice = 283.63;
        const productImage = document.querySelector('.main-image.active').src;
        
        cart.push({
            name: `${productName} - Talla: ${selectedSize}`,
            price: productPrice,
            img: productImage
        });
        
        updateCart();
        
        // Feedback visual
        this.textContent = '✓ AGREGADO';
        this.classList.add('added');
        setTimeout(() => {
            this.textContent = 'AGREGAR AL CARRITO';
            this.classList.remove('added');
        }, 2000);
    });
    
    // Eliminar items del carrito (delegación de eventos)
    document.querySelector('.cart-items').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });
    
    // Proceso de pago
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        paymentModal.style.display = 'flex';
    });
    
    confirmBtn.addEventListener('click', function() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        
        if (!selectedPayment) {
            alert('Por favor selecciona un método de pago');
            return;
        }
        
        const paymentMethod = selectedPayment.value;
        const methodText = {
            efectivo: 'Efectivo',
            tarjeta: 'Tarjeta',
            transferencia: 'Transferencia'
        }[paymentMethod];
        
        const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
        alert(`¡Gracias por tu compra!\n\nTotal: $${totalAmount.toFixed(2)} MXN\nMétodo de pago: ${methodText}\n\nTu pedido será procesado.`);
        
        // Resetear carrito
        cart = [];
        updateCart();
        paymentModal.style.display = 'none';
        cartModal.classList.remove('active');
        overlay.classList.remove('active');
    });
});
