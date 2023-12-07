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

// Estrutura inicial do carrinho
var cart = [];

// Função para adicionar ao carrinho
function addToCart(productId, productPrice) {
    var existingProduct = cart.find(product => product.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1, price: productPrice });
    }
    updateCartUI();
}

// Event listener para botões de adicionar ao carrinho
document.querySelectorAll('.dish-add-btn').forEach(button => {
    button.addEventListener('click', function() {
        var productId = this.getAttribute('data-id');
        var productPrice = parseFloat(this.getAttribute('data-price'));
        addToCart(productId, productPrice);
    });
});

// Função para atualizar a quantidade de um item no carrinho
function updateItemQuantity(productId, newQuantity) {
    var item = cart.find(item => item.id === productId);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
    } else if (item && newQuantity <= 0) {
        removeFromCart(productId);
    }
    updateCartUI();
}

// Função para remover um item do carrinho
function removeFromCart(productId) {
    var index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

// Função para calcular o total do carrinho
function calculateCartTotal() {
    var total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total.toFixed(2); // Retorna o total formatado com duas casas decimais
}

// Função para renderizar os itens do carrinho no modal
function renderCartItems() {
    var cartItemsContainer = document.querySelector('#cartModal .modal-body');
    cartItemsContainer.innerHTML = ''; // Limpa os itens existentes

    cart.forEach(item => {
        var itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.textContent = ` ${item.id} R$ ${item.price}`;

        // Botão para diminuir a quantidade
        var decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.className = 'quantity-btn decrease';
        decreaseButton.addEventListener('click', function() {
            updateItemQuantity(item.id, item.quantity - 1);
        });
        itemElement.appendChild(decreaseButton);

        // Exibir a quantidade
        var quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = ` Quantidade: ${item.quantity} `;
        itemElement.appendChild(quantityDisplay);

        // Botão para aumentar a quantidade
        var increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.className = 'quantity-btn increase';
        increaseButton.addEventListener('click', function() {
            updateItemQuantity(item.id, item.quantity + 1);
        });
        itemElement.appendChild(increaseButton);


        cartItemsContainer.appendChild(itemElement);
    });

    // Adiciona o total no final do modal do carrinho
    var totalElement = document.createElement('div');
    totalElement.className = 'total';
    totalElement.textContent = `Total: R$ ${calculateCartTotal()}`;
    cartItemsContainer.appendChild(totalElement);
}



// Função para atualizar a interface do usuário do carrinho
function updateCartUI() {
    var totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-number').textContent = totalItems;
    renderCartItems(); // Atualiza a exibição dos itens e do total no modal

    // Atualiza o estado do botão de checkout com base no estado do carrinho
    var checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.disabled = cart.length === 0;
}

// Event listener para o botão de checkout
document.getElementById('checkoutButton').addEventListener('click', function() {
    var deliveryAddress = document.getElementById('deliveryAddress').value;
    var deliveryZip = document.getElementById('deliveryZip').value;
    
    // Verifique se os campos de entrega estão preenchidos
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
    } else if (!deliveryAddress || !deliveryZip) {
        alert('Por favor, preencha as informações de entrega!');
    } else {
        alert('Compra finalizada com sucesso!');
        cart = []; // Esvazia o carrinho
        updateCartUI(); // Atualiza a interface do usuário
    }
});
