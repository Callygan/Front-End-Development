export function renderProducts(list) {
    const container = document.getElementById("products");
    if (!container) return;

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
