const cartToggle = document.getElementById('cart-toggle');
const cartDetails = document.getElementById('cart-details');
const cartClose = document.getElementById('cart-close');
const cartCount = document.getElementById('cart-count');

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        return JSON.parse(savedCart);
    }
    return [];
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

let cartItems = loadCart();

// Toggle cart visibility
cartToggle.addEventListener('click', () => {
    cartDetails.classList.toggle('visible');
});

// Close cart
cartClose.addEventListener('click', () => {
    cartDetails.classList.remove('visible');
});

// Add item to cart
document.querySelectorAll('.card-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const cardItem = event.target.closest('.card-item');
        const itemName = cardItem.querySelector('.card-title').textContent;
        const itemImg = cardItem.querySelector('.card-img').src;
        const itemPrice = cardItem.dataset.price;
        const itemId = cardItem.dataset.id;

        const existingItem = cartItems.find(item => item.id === itemId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                id: itemId,
                name: itemName,
                img: itemImg,
                price: itemPrice,
                quantity: 1
            });
        }
        saveCart();
        updateCart();
    });
});

// Remove item from cart
function removeItem(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
        saveCart();
        updateCart();
    }
}

// Update cart display
function updateCart() {
    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartContent = cartItems.map(item => `
        <div class="header__cart-details-item">
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div>${item.price}</div>
            <div>Quantity: ${item.quantity}</div>
            <button class="remove-item" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
    `).join('');
    cartDetails.innerHTML = `<button id="cart-close" class="header__cart-close">X</button>${cartContent}`;

    // Reattach event listener to dynamically created close button
    document.querySelector('.header__cart-close').addEventListener('click', () => {
        cartDetails.classList.remove('visible');
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemId = event.target.closest('.remove-item').dataset.id;
            removeItem(itemId);
        });
    });
}

// Initial cart update
updateCart();

/////////////////////////////// DARK Mode code

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggleIcon = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }

    // Toggle dark mode on icon click
    darkModeToggleIcon.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
});


/////////// HEADER nav bar CODE 

document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.querySelector('.Header-menu-toggle');
    var navMenu = document.querySelector('.nav-bar');
    var headerActions = document.querySelector('.header-actions');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-menu');
        headerActions.classList.toggle('mobile-menu');
        menuToggle.classList.toggle('active');
    });
});



/////////////////////////// MAP CODE

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.716, lng: 44.783},
        zoom: 12
    });

    var marker = new google.maps.Marker({
        position: {lat: 41.716, lng: 44.783},
        map: map,
        title: 'Tbilisi Didi Digomi 3'
    });

    var map = L.map('map').setView([41.716, 44.783], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([41.716, 44.783]).addTo(map)
        .bindPopup('Tbilisi Didi Digomi 3')
        .openPopup();
}

