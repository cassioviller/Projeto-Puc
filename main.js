function encrypt(alpha, betha) {
    return btoa(alpha + betha);
}

// Estrutura de Dados dos Produtos
const products = [
    {
        id: "insalata-caprese",
        name: "Insalata Caprese",
        price: 9.99,
        image: "assets/images/dish/1.png",
        calories: 300,
        type: "Vegetariano",
        servingSize: 1
    },
    {
        id: "spaghetti-carbonara",
        name: "Spaghetti Carbonara",
        price: 12.99,
        image: "assets/images/dish/2.png",
        calories: 500,
        type: "Não Veg",
        servingSize: 1
    },
    {
        id: "scaloppine-milanese",
        name: "Scaloppine alla Milanese",
        price: 15.99,
        image: "assets/images/dish/3.png",
        calories: 450,
        type: "Não Veg",
        servingSize: 1
    },
    {
        id: "risotto-funghi",
        name: "Risotto ai Funghi",
        price: 13.50,
        image: "assets/images/dish/4.png",
        calories: 350,
        type: "Vegetariano",
        servingSize: 1
    },
    {
        id: "branzino-grigliato",
        name: "Branzino Grigliato",
        price: 18.99,
        image: "assets/images/dish/5.png",
        calories: 300,
        type: "Não Veg",
        servingSize: 1
    },
    {
        id: "tiramisu",
        name: "Tiramisù",
        price: 89.99,
        image: "assets/images/dish/6.png",
        calories: 420,
        type: "Vegetarsiano",
        servingSize: "1-2"
    }
];

class DatabaseConnection {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || []
        this.orders = JSON.parse(localStorage.getItem('orders')) || []
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
    }

    addUser(email, password, name, address) {
        this.users.push({
            email: email,
            password: encrypt(email, password),
            name: name,
            address: address
        })

        localStorage.setItem('users', JSON.stringify(this.users))
    }

    addOrder(userEmail, total, items) {
        this.orders.push({
            userEmail: userEmail,
            total: total,
            items: items
        })

        localStorage.setItem('orders', JSON.stringify(this.orders))
    }

    addCartItem(productId, quantity, price, image) {
        this.cart.push({
            productId: productId,
            quantity: quantity, 
            price: price,
            image: image
        });

        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    removeCart() {
        this.cart = [];
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}

const databaseConnection = new DatabaseConnection();

$(document).ready(function ($) {
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});

document.querySelector('.header-cart').addEventListener('click', function() {
    var cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
});

// Função para adicionar ao carrinho
function addToCart(productId, productPrice, productImage) {
    var existingProduct = databaseConnection.cart.find(product => product.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        databaseConnection.addCartItem(productId, 1, productPrice, productImage);
    }
    updateCartUI();
}

// Event listener para botões de adicionar ao carrinho
document.querySelectorAll('.dish-add-btn').forEach(button => {
    button.addEventListener('click', function() {
        var productId = this.getAttribute('data-id');
        var productPrice = parseFloat(this.getAttribute('data-price'));
        var productImage = this.getAttribute('data-image');
        addToCart(productId, productPrice, productImage);
    });
});

// Função para atualizar a quantidade de um item no carrinho
function updateItemQuantity(productId, newQuantity) {
    var item = databaseConnection.cart.find(item => item.id === productId);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
    } else if (item && newQuantity <= 0) {
        removeFromCart(productId);
    }
    updateCartUI();
}

// Função para remover um item do carrinho
function removeFromCart(productId) {
    var index = databaseConnection.cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        databaseConnection.cart.splice(index, 1);
    }
    updateCartUI();
}

// Função para calcular o total do carrinho
function calculateCartTotal() {
    var total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total.toFixed(2);
}

// Função para renderizar os itens do carrinho no modal
function renderCartItems() {
    var cartItemsContainer = document.querySelector('#cartModal .modal-body');
    cartItemsContainer.innerHTML = '';

    databaseConnection.cart.forEach(item => {
        var itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.id}" style="width: 50px; height: 50px;">
            <p>${item.id} - R$ ${item.price}</p>
            <span>Quantidade: ${item.quantity}</span>
        `;

        var decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.className = 'quantity-btn decrease';
        decreaseButton.addEventListener('click', function() {
            updateItemQuantity(item.id, item.quantity - 1);
        });
        itemElement.appendChild(decreaseButton);

        var increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.className = 'quantity-btn increase';
        increaseButton.addEventListener('click', function() {
            updateItemQuantity(item.id, item.quantity + 1);
        });
        itemElement.appendChild(increaseButton);

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', function() {
            removeFromCart(item.id);
        });
        itemElement.appendChild(removeButton);

        cartItemsContainer.appendChild(itemElement);
    });

    var totalElement = document.createElement('div');
    totalElement.className = 'total';
    totalElement.textContent = `Total: R$ ${calculateCartTotal()}`;
    cartItemsContainer.appendChild(totalElement);
}

// Função para atualizar a interface do usuário do carrinho
function updateCartUI() {
    var totalItems = databaseConnection.cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-number').textContent = totalItems;
    renderCartItems();

    var checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.disabled = databaseConnection.cart.length === 0;
}

document.getElementById('checkoutButton').addEventListener('click', function() {
    if (databaseConnection.cart.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        alert('Compra finalizada com sucesso!');
        databaseConnection.removeCart(); // Esvazia o carrinho
        updateCartUI(); // Atualiza a interface do usuário
    }
});

function cacheCurrentUser(email) {
    cacheData = {
        email: email,
        validUntil: new Date().getTime() + 300000 // 5 minutos
    }

    localStorage.setItem('currentUser', JSON.stringify(cacheData));
}

// Função para cadastrar um novo usuário
function register() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;

    if (password !== confirmPassword) {
        alert('As senhas não conferem!');
        return;
    }

    databaseUser = databaseConnection.users.find(user => user.email === email);
    if (databaseUser) {
        alert('Já existe um usuário cadastrado com esse e-mail!');
        return;
    }

    cacheCurrentUser(email);

    databaseConnection.addUser(email, password, name, address);

    alert('Usuário cadastrado com sucesso!');
    window.location.href = 'index.html';
}

// Função para fazer login
function login() {
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    var user = databaseConnection.users.find(user => user.email === email);

    if (!user) {
        alert('Usuário ou senha incorretos!');
        return;
    }

    var validPassword = password && encrypt(email, password) === user.password;

    if (user && validPassword) {
        cacheCurrentUser(email);

        window.location.href = 'index.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

// Função para verificar se o usuário está logado
function checkLogin() {
    var storedData = localStorage.getItem('currentUser');
    if (!storedData) {
        window.location.href = 'login_or_register.html';
    }

    var currentUser = JSON.parse(storedData);
    var validUntil = currentUser.validUntil;

    if (validUntil < new Date().getTime()) {
        localStorage.removeItem('user');
        alert('Sessão expirada! Faça login novamente.');
        window.location.href = 'login_or_register.html';
        return;
    }

    window.location.href = 'user.html';
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

updateCartUI()
