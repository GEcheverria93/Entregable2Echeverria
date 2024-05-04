const productsArray = [
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

const initializeProducts = (products) => {
    const productsContainer = document.getElementById("products-container");

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
        productContent.appendChild(productImg);
        productContent.appendChild(productTitle);
        productContent.appendChild(productPrice);
        article.appendChild(productContent);
        article.appendChild(addToCartButton);
        productsContainer.appendChild(article);
    });
};

const showCart = () => {
    const storedProducts = getStoredProducts();
    if (!storedProducts) return;
    const cartProducts = JSON.parse(storedProducts);
    if (!cartProducts.length) return;

    const cartList = document.getElementById("cart-list");
    cartProducts.forEach(cartProduct => {
        let cartProductItem = document.createElement("li");
        let article = document.createElement("article");
        article.className = "cart-product";
        let cartProductImg = document.createElement("img");
        cartProductImg.src = `./images/${cartProduct.image}`;
        cartProductImg.className = "cart-product-img";
        let cartProductTitle = document.createElement("span");
        cartProductTitle.className = "product-title";
        cartProductTitle.textContent = `${cartProduct.name}`;
        let cartProductPrice = document.createElement("p");
        cartProductPrice.textContent = `$${cartProduct.price}`;
        cartProductPrice.className = "product-price";
        let cartProductActions = document.createElement("div");
        cartProductActions.className = "cart-product-actions";

        // Botón para sumar item
        let addItemButton = document.createElement("button");
        addItemButton.className = "btn-add";
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
};

const getStoredProducts = () => {
    return localStorage.getItem("cart");
};

const addToCart = (product) => {
    const storedProducts = getStoredProducts();
    let cartProductsArray = [];
    if (storedProducts) {
        let cartProducts = JSON.parse(storedProducts);
        cartProductsArray = cartProducts;
    }
    let newCartProducts = [...cartProductsArray, product];
    localStorage.setItem('cart', JSON.stringify(newCartProducts));
};

const removeFromCart = (id) => {
    const storedProducts = getStoredProducts();
    if (!storedProducts) return;
    let storedProductsArray = JSON.parse(storedProducts);
    if (!storedProductsArray.length) return;
    let newCartProducts = storedProductsArray.filter((product) => product.id === id);
    localStorage.setItem('cart', JSON.stringify(newCartProducts));
};

const findProduct = (id) => {
    return productsArray.find((product) => product.id === id);
};

document.addEventListener("DOMContentLoaded", () =>{
    initializeProducts(productsArray);
    showCart();
});