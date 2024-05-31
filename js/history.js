const getHistory = () => {
    let history = localStorage.getItem("history");
    history = history ? JSON.parse(history) : [];
    return history;
};

const showHistory = (history) => {
    let historyContainer = document.getElementById("history-container");

    // Si el historial está vacío
    if (!history.length) {
        historyContainer.textContent = "No hay compras realizadas recientemente. El historial está vacío."
        historyContainer.className = "empty-history";
        return;
    }

    // Si el historial tiene compras
    history.forEach(purchase => {
        let purchaseContainer = document.createElement("details");
        let purchaseTitle = document.createElement("summary");
        purchaseTitle.textContent = "Fecha: " + purchase.dateTime + " - Valor: $" + purchase.price;
        purchaseContainer.appendChild(purchaseTitle);

        let purchasedProductList = document.createElement("article");

        let purchasedProducts = purchase.products;
        purchasedProducts.forEach(product => {
            let productContainer = document.createElement("div");
            productContainer.className = "purchased-product-container";

            let productCount = document.createElement("strong");
            productCount.textContent = product.count + " x";

            let productName = document.createElement("span");
            productName.textContent = product.name;

            let productPrice = document.createElement("strong");
            productPrice.textContent =  "$" + product.price;
            let productImg = document.createElement("img");
            productImg.src = `./images/${product.image}`;
            productImg.className = "history-product-img"

            productContainer.appendChild(productCount);
            productContainer.appendChild(productName);
            productContainer.appendChild(productPrice);
            productContainer.appendChild(productImg);

            // Añadir el producto a la lista de productos
            purchasedProductList.appendChild(productContainer);
        });

        // Añadir la lista de productos a la compra
        purchaseContainer.appendChild(purchasedProductList);
        // Añadir la compra al historial
        historyContainer.appendChild(purchaseContainer);
    });

    // Crear el botón de limpiar historial
    let clearButton = document.createElement("button");
    clearButton.textContent = "Limpiar Historial";
    clearButton.className = "clear-history-button";
    clearButton.addEventListener("click", () => {
        localStorage.removeItem("history");
        location.reload(); // Recargar la página
    });

    // Añadir el botón al contenedor del historial
    historyContainer.appendChild(clearButton);
};

document.addEventListener("DOMContentLoaded", async () => {
    const history = getHistory();
    showHistory(history);
});