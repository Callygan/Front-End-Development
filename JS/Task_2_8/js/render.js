import { addToCart, openCart } from "./cart.js";

export function renderProducts(list) {
    const container = document.getElementById("products");
    if(!container) return;

    container.innerHTML = "";

    list.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.image}">
                <button data-id="${product.id}"><span>+</span>Add</button>
                <div class="card-content">
                    <h3>${product.title}</h3>
                    <p>${product.price}</p>
                    <div><img src="${product.rating}" alt="Fox Icon" class="fox-icon"></div>
                    <h4>${product.category}</h4>
                </div>
            </div>
        `;
    });

    container.querySelectorAll("button[data-id]").forEach(btn => {
        btn.addEventListener("click", () => {
            addToCart(Number(btn.dataset.id));
        });
    });
}