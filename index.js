const productCatalog = [
    {
        id: 1,
        name: "PC Armada Gamer Extreme Ryzen 5 5600 /Cooler /RTX 4070 Super /B550M /32GB /1TB /Gabinete /Fuente 750W 80P",
        price: 1763236,
        stock: 5,
        image: "product1.webp",
    },
    {
        id: 2,
        name: "PC Armada Gamer Extreme Ryzen 7 5700 /Cooler /RTX 4070 Super /B550M /16GB /1TB /Gabinete /Fuente 750W 80P",
        price: 1775648,
        stock: 5,
        image: "product1.webp",
    },
    {
        id: 3,
        name: "PC Armada Gamer Extreme I5 13400F /Cooler /RTX 4070 Super /B760M /16GB /500GB /Gabinete /Fuente 750W 80P",
        price: 1833569,
        stock: 5,
        image: "product1.webp",
    },
    {
        id: 4,
        name: "PC Armada Gamer Extreme I7 12700F /Cooler /RTX 4070 Super /B760M /16GB /500GB /Gabinete /Fuente 750W 80P",
        price: 1952423,
        stock: 5,
        image: "product1.webp",
    },
    {
        id: 5,
        name: "PC Armada Gamer Extreme I9 14900K /Cooler /RX 7900 XTX /Z790 /32GB /1TB /Gabinete /Fuente 850W 80P",
        price: 3672260,
        stock: 5,
        image: "product1.webp",
    },
    {
        id: 6,
        name: `Notebook Gamer Lenovo Legion 5 15ACH6H  FHD 15.6" R5 5600H 16GB (2x8GB) 1TB SSD NVME RTX 3060 6GB W11S 165Hz`,
        price: 1295750,
        stock: 5,
        image: "product2.jpg",
    },
    {
        id: 7,
        name: `Notebook Gamer Lenovo Legion 5 15ACH6H WQHD 2K 15.6" R5 5600H 16GB (2x8GB) 512GB NVME RTX 3060 6GB W11S 165Hz`,
        price: 1199990,
        stock: 5,
        image: "product2.jpg",
    },
    {
        id: 8,
        name: `Notebook Gamer Lenovo Legion 5 15ACH6A WQHD 2K 15.6" R5 5600H 16GB (2x8GB) 512GB SSD NVME RX6600M 8GB W11 165Hz Silver`,
        price: 1169850,
        stock: 5,
        image: "product2.jpg",
    },
    {
        id: 9,
        name: `Notebook Lenovo ThinkPad E14 FHD 14" Core I7 1165G7 8GB 256GB SSD NVMe Freedos`,
        price: 1144990,
        stock: 5,
        image: "product2.jpg",
    },
    {
        id: 10,
        name: `Notebook Gamer Lenovo Legion 5 15ITH6H FHD 15.6" I5 11400H 8GB 512GB NVME RTX 3060 6GB W11S 165Hz Silver`,
        price: 1134990,
        stock: 5,
        image: "product2.jpg",
    },
];

let isCartOpen = false;

// Mostrar la lista de productos
const showProductList = (products) => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    products.forEach(product => {
        let article = document.createElement("article");
        article.className = "product";
        let productContent = document.createElement("div");
        let productImg = document.createElement("img");
        productImg.src = `./images/${product.image}`;
        let productTitle = document.createElement("span");
        productTitle.className = "product-title";
        productTitle.textContent = product.name;
        let productPrice = document.createElement("p");
        productPrice.textContent = `$${product.price}`;
        productPrice.className = "product-price";
        let addToCartButton = document.createElement("button")
        addToCartButton.className = "add-to-cart-btn";
        addToCartButton.textContent = "Añadir al carrito";
        let productStock = checkProductStock(product.id);
        if (!productStock) addToCartButton.disabled = true;
        addToCartButton.dataset.productId = product.id;
        productContent.appendChild(productImg);
        productContent.appendChild(productTitle);
        productContent.appendChild(productPrice);
        article.appendChild(productContent);
        article.appendChild(addToCartButton);
        productsContainer.appendChild(article);
    });
    setupProductsEvents();
};

// Mostrar el carrito de compras con los productos agregados
const showCart = () => {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    const storedProducts = getStoredProducts();
    if (!storedProducts) return;
    const cartProducts = JSON.parse(storedProducts);
    if (!cartProducts.length) return;

    cartProducts.forEach(cartProduct => {
        let cartProductItem = document.createElement("li");
        let article = document.createElement("article");
        article.className = "cart-product";
        let cartProductImg = document.createElement("img");
        cartProductImg.src = `./images/${cartProduct.image}`;
        cartProductImg.className = "cart-product-img";
        let cartProductTitle = document.createElement("span");
        cartProductTitle.className = "product-title";
        cartProductTitle.innerHTML = `<strong>${cartProduct.count}</strong> x ${cartProduct.name}`;
        let cartProductPrice = document.createElement("p");
        cartProductPrice.textContent = `$${cartProduct.price}`;
        cartProductPrice.className = "product-price";
        let cartProductActions = document.createElement("div");
        cartProductActions.className = "cart-product-actions";

        // Botón para sumar item
        let addItemButton = document.createElement("button");
        addItemButton.className = "btn-add";
        addItemButton.dataset.productId = cartProduct.id;
        let productStock = checkProductStock(cartProduct.id);
        if (!productStock) addItemButton.disabled = true;
        let addSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        addSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        addSvg.setAttribute("width", "24");
        addSvg.setAttribute("height", "24");
        addSvg.setAttribute("viewBox", "0 0 24 24");
        let addPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        addPath.setAttribute("fill", "currentColor");
        addPath.setAttribute("d", "M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22");
        addSvg.appendChild(addPath);
        addItemButton.appendChild(addSvg);

        // Botón de remover item
        let removeItemButton = document.createElement("button");
        removeItemButton.className = "btn-remove";
        removeItemButton.dataset.productId = cartProduct.id;
        let removeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        removeSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        removeSvg.setAttribute("width", "24");
        removeSvg.setAttribute("height", "24");
        removeSvg.setAttribute("viewBox", "0 0 24 24");
        let removePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        removePath.setAttribute("fill", "currentColor");
        removePath.setAttribute("fill-rule", "evenodd");
        removePath.setAttribute("d", "M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-5-8h10v-2H7z");
        removePath.setAttribute("clip-rule", "evenodd");
        removeSvg.appendChild(removePath);
        removeItemButton.appendChild(removeSvg);

        // Agregar botones al div 
        cartProductActions.appendChild(addItemButton);
        cartProductActions.appendChild(removeItemButton);

        // Agregar elementos al article
        article.appendChild(cartProductImg);
        article.appendChild(cartProductTitle);
        article.appendChild(cartProductPrice);
        article.appendChild(cartProductActions);

        // Agregar el article al li y el li a la lista del carrito
        cartProductItem.appendChild(article);
        cartList.appendChild(cartProductItem);
    });

    // Elemento para mostrar el precio total
    let totalPrice = checkTotalPrice();
    let totalElement = document.createElement("div");
    totalElement.textContent = "Total:";
    let totalAmountElement = document.createElement("strong");
    totalAmountElement.textContent = `$${totalPrice}`;
    totalElement.appendChild(totalAmountElement);
    totalElement.className = "total-price";
    // Botones
    let buyButton = document.createElement("button");
    buyButton.className = "btn-buy";
    buyButton.textContent = "Comprar";
    let clearCartButton = document.createElement("button");
    clearCartButton.className = "btn-clear";
    clearCartButton.textContent = "Limpiar carrito";

    // Agregar precio total y botonoes al final de la lista del carrito
    cartList.appendChild(totalElement);
    cartList.appendChild(buyButton);
    cartList.appendChild(clearCartButton);

    setupCartEvents();
};

// Obtener los productos del carrito almacenados en localStorage
const getStoredProducts = () => {
    return localStorage.getItem("cart");
};

// Mostrar o ocultar el carrito al hacer click
const toggleCart = () => {
    const cart = document.getElementById('cart');
    const productsContainer = document.getElementById('products-container');
    const logoContainer = document.getElementById('cart-toggle-icon');
    const cartProductList = document.getElementById('cart-list');
    if (isCartOpen) {
        productsContainer.className = 'products-container-cart-closed';
        cart.className = "cart-closed";
        logoContainer.className = 'logo-cart-is-closed';
        logoContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16">
            <path tColor" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607L1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2a1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
            />
        </svg>
        `;
        cartProductList.style.display = 'none';
        isCartOpen = false;
    } else {
        productsContainer.className = 'products-container-cart-open';
        cart.className = "cart-open";
        logoContainer.className = 'logo-cart-is-open';
        logoContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16">
            <path fill="#000000" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607l1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4a2 2 0 0 0 0-4h7a2 2 0 1 0 0 4a2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0a1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0M7.354 5.646L8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207L7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5L6.646 6.354a.5.5 0 1 1 .708-.708"
            />
        </svg>
        `;
        cartProductList.style.display = 'flex';
        isCartOpen = true;
    }
};

// Agregar un producto al carrito
const addToCart = (id) => {
    const storedProducts = getStoredProducts();
    let cartProductsArray = [];
    let product = findProductById(id, productCatalog);
    if (!product) return;
    let newCartProduct;
    if (storedProducts) {
        // Si hay productos actualmente en el carrito
        let cartProducts = JSON.parse(storedProducts);
        cartProductsArray = cartProducts;
        let existingProductInCart = findProductById(id, cartProductsArray);
        if (existingProductInCart) {
            // Si ya hay un item de este producto
            existingProductInCart.count += 1;
            localStorage.setItem('cart', JSON.stringify(cartProductsArray));
            return;
        }
    }
    // Si no hay productos en el carrito y este sera el primero o 
    // no hay un item de este producto 
    newCartProduct = {
        ...product,
        count: 1,
    }
    let newCartProducts = [...cartProductsArray, newCartProduct];
    localStorage.setItem('cart', JSON.stringify(newCartProducts));
};

// Quitar un producto del carrito
const removeFromCart = (id) => {
    const storedProducts = getStoredProducts();
    if (!storedProducts) return;
    let storedProductsArray = JSON.parse(storedProducts);
    if (!storedProductsArray.length) return;
    let foundProductInCart = findProductById(id, storedProductsArray);
    if (!foundProductInCart) return;

    let productQuantity = foundProductInCart.count;
    if (productQuantity > 1) {
        // Si hay mas de un item del producto bajamos la cantidad
        foundProductInCart.count -= 1;
        localStorage.setItem('cart', JSON.stringify(storedProductsArray));
        return;
    }

    // Si solo hay uno lo quitamos
    let newCartProducts = storedProductsArray.filter((product) => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(newCartProducts));
};

// Encontrar un producto por su ID dentro de un array de productos
const findProductById = (id, productsArray) => {
    return productsArray.find((product) => product.id === id);
};

// Chequear si un producto tiene stock
const checkProductStock = (id) => {
    let product = findProductById(id, productCatalog);
    if (!product) return false;
    if (product.stock <= 0) return false;
    const storedProducts = getStoredProducts();
    if (!storedProducts) return true;
    let cartProductsArray = JSON.parse(storedProducts);
    if (!cartProductsArray.length) return true;
    let existingProductInCart = findProductById(id, cartProductsArray);
    if (!existingProductInCart) return true;
    let stock = (existingProductInCart.count < product.stock);
    return stock;
};

// Chequear el precio total del carrito
const checkTotalPrice = () => {
    const storedProducts = getStoredProducts();
    if (!storedProducts) return 0;
    const cartProducts = JSON.parse(storedProducts);
    if (!cartProducts.length) return 0;

    let totalPrice = 0;

    cartProducts.forEach(cartProduct => {
        totalPrice += cartProduct.price * cartProduct.count;
    });

    return totalPrice;
};

// Limpiar carrito
const clearCart = () => {
    localStorage.removeItem("cart");
    showCart();
    showProductList(productCatalog);
};

// Función para realizar la simulación de la compra
const performPurchase = () => {
    const storedProducts = getStoredProducts();
    if (!storedProducts) return;
    const cartProducts = JSON.parse(storedProducts);
    if (!cartProducts.length) return;

    let totalPrice = checkTotalPrice();

    // Se muestra una alerta con un mensaje para indicar que se realizó con éxito
    alert(`Has realizado una compra con un valor de $${totalPrice}, ¡Felicitaciones!`);
    clearCart();
};

// Eventos del DOM para el listado de productos
const setupProductsEvents = () => {
    let addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    if (addToCartButtons?.length) {
        // Boton de añadir al carrito
        addToCartButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                let btnProductId = btn.dataset.productId;
                if (!btnProductId) return;
                addToCart(Number(btnProductId));
                showCart();
                showProductList(productCatalog);
            });
        });
    }
};

// Eventos del DOM para el carrito de compras
const setupCartEvents = () => {
    let addItemButtons = document.querySelectorAll(".btn-add");
    if (addItemButtons?.length) {
        // Boton de añadir item
        addItemButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                let btnProductId = btn.dataset.productId;
                if (!btnProductId) return;
                addToCart(Number(btnProductId));
                showCart();
                showProductList(productCatalog);
            });
        });
    };

    let removeItemButtons = document.querySelectorAll(".btn-remove");
    if (removeItemButtons?.length) {
        // Boton de quitar item
        removeItemButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                let btnProductId = btn.dataset.productId;
                if (!btnProductId) return;
                removeFromCart(Number(btnProductId));
                showCart();
                showProductList(productCatalog);
            });
        });
    };

    let clearCartButton = document.querySelector(".btn-clear");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", clearCart);
    }

    let buyButton = document.querySelector(".btn-buy");
    if (buyButton) {
        buyButton.addEventListener("click", performPurchase);
    }
};

// Funciones iniciales a ejecutar cuando carga la página
document.addEventListener("DOMContentLoaded", () => {
    showProductList(productCatalog);
    showCart();
    const cartLogo = document.getElementById('cart-toggle-icon');
    cartLogo.addEventListener('click', toggleCart);
});