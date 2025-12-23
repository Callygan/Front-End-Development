import { products } from "./data.js";

export function renderProducts(list) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    list.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.image}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button data-id="${product.id}">Add</button>
            </div>
        `;
    });
}

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = products.filter(p => 
        p.title.toLowerCase().includes(value)
    );

    renderProducts(filtered);
});

function filterByCategory(category) {
    if (category === "ALL") {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
}