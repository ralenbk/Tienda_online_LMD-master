let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let cartCount = document.querySelector('#cart-count');
let findIcon = document.querySelector('#find-icon');
let find= document.querySelector('.find');
let closeFind = document.querySelector('#close-find')
const botones = {
    aromanza: document.getElementById('aromanza'),
    sagrada: document.getElementById('sagrada'),
    iluminarte: document.getElementById('iluminarte'),
    hornitos: document.getElementById('hornitos'),
    otros_productos: document.getElementById('otros_productos')
};

// Open Cart
cartIcon.onclick = () => {
    cart.classList.add('active');
};

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}
// Cart Working JS
window.addEventListener("load", ready);

// Making Function
function ready() {
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add To Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    // Buy button Work
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);

    loadCart();
}

// Load Cart
function loadCart() {
    if (localStorage.getItem("cart")) {
        var cartItems = JSON.parse(localStorage.getItem("cart"));
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg, item.selectedValue, item.quantity);
        }
        updateTotal();
        updateCartCount();
    }
}

// Save Cart
function saveCart() {
    var cartItems = [];
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var selectedElement = cartBox.getElementsByClassName("selected-value")[0];
        var title = titleElement.innerText;
        var price = priceElement.innerText;
        var quantity = quantityElement.value;
        var selected = selectedElement.innerText;
        var productImg = cartBox.getElementsByClassName("cart-img")[0].src;
        cartItems.push({
            title: title,
            price: price,
            quantity: quantity,
            selectedValue: selected,
            productImg: productImg
        });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Buy Button
function buyButtonClicked() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    if (cartContent.childElementCount > 0) {
        var products = [];
        var cartBoxes = cartContent.getElementsByClassName("cart-box");
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
            var priceElement = cartBox.getElementsByClassName("cart-price")[0];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            var selectedElement = cartBox.getElementsByClassName("selected-value")[0];
            var title = titleElement.innerText;
            var price = priceElement.innerText;
            var quantity = quantityElement.value;
            var selected = selectedElement.innerText;
            products.push(`${title} (${selected}) x ${quantity} ${price}`);
        }
        var message = "Hola, quiero hacer un pedido con los siguientes productos:\n\n" + products.join(", \n\n") +
        " \n\n" + "El total es de: " + document.getElementsByClassName("total-price")[0].innerText;
        var url = "https://wa.me/543404571018/?text=" + encodeURIComponent(message);
        window.open(url);
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
        updateCartCount();
        saveCart();
    } else {
        alert("Tu carrito está vacío");
    }
}

// Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    updateCartCount();
    saveCart();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
    saveCart();

}

// Add To Cart
function addCartClicked(event) {
    var button = event.target;
    var selectElement = document.getElementById("product-select");
    var selectedValue = selectElement.options[selectElement.selectedIndex].value;
    if (selectedValue === "Seleccionar fragancias") {
        alert("Por favor, selecciona una fragancia antes de agregar al carrito.");
        return; // Detiene la ejecución si no se ha seleccionado una opción válida
    }
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price-product")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    var selectElement = document.getElementById("product-select");
    var selectedValue = selectElement.options[selectElement.selectedIndex].value;
    var quantity = 1;
    // Verifica si el producto tiene la clase "no-stock"
    if (shopProducts.classList.contains("no-stock")) {
        alert("Este producto está agotado y no se puede agregar al carrito.");
        return;
    }
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var selectedElement = cartBox.getElementsByClassName("selected-value")[0];
        if (selectedElement.innerText === selectedValue) {
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantity += parseInt(quantityElement.value);
            cartContent.removeChild(cartBox);
            break;
        }
    }
    addProductToCart(title, price, productImg, selectedValue, quantity);
    updateTotal();
    updateCartCount();
    saveCart();
}

function addProductToCart(title, price, productImg, selectedValue, quantity) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("selected-value");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == selectedValue) {
            alert("Ya has añadido este artículo al carrito");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="${quantity}" class="cart-quantity">
            <div class="selected-value">${selectedValue}</div>
        </div>
        <!--Remove Cart-->
        <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}

// Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    document.getElementsByClassName("total-price")[0].innerText = "$" + total.toFixed(2);
}

// Update Cart Count
function updateCartCount() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartCount = document.getElementById("cart-count");
    var count = cartContent.childElementCount;
    cartCount.innerText = count;
}

//Search Input

document.querySelector('.search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.querySelector('.search-input').value.toLowerCase();
    const products = Array.from(document.querySelectorAll('.wsk-cp-product'));
    
    // Ocultar todos los productos primero
    products.forEach(product => {
        product.style.display = 'none';
    });

    // Crear un contenedor temporal para productos visibles
    const visibleProducts = [];

    // Filtrar productos y agregar los visibles al array
    products.forEach(function(product) {
        const title = product.querySelector('.title-product h3').textContent.toLowerCase();
        const marcaElement = product.querySelector('.category-marca h3');
        const typeProduct = product.querySelector('.category-marca span');
        const marca = marcaElement ? marcaElement.textContent.toLowerCase() : '';
        const tipo = typeProduct ? typeProduct.textContent.toLowerCase() : '';

        if (title.includes(query) || marca.includes(query) || tipo.includes(query)) {
            visibleProducts.push(product);
        }
    });

    // Obtener el contenedor de productos
    const container = document.querySelector('.shop-content');

    // Mostrar los productos visibles y moverlos al principio
    visibleProducts.forEach(product => {
        container.prepend(product);  // Mueve el producto al principio del contenedor
        product.style.display = 'block';  // Muestra el producto
    });

    // Asegurarse de que el contenedor de productos no visibles esté vacío
    const hiddenProducts = products.filter(product => !visibleProducts.includes(product));
    hiddenProducts.forEach(product => {
        product.style.display = 'none';  // Oculta los productos no visibles
    });
});
