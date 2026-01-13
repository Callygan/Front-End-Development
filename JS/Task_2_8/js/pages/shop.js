import { products } from "../data.js";
import { renderProducts } from "../render.js";

let currentProducts = [...products];

export function renderShop() {
    const app = document.getElementById("app");

    app.innerHTML = `

        <section class="about-header">
            <span id="breadcrumb"></span>
            <h1 id="page-title"></h1>
        </section>

        <div class="shop-container">
            <div class="controls">
                <input type="text" id="searchInput" placeholder="Search"/>

                <div class="filters">
                    <button data-category="All">All</button>
                    <button data-category="Forest">Forest</button>
                    <button data-category="Fox kids">Fox kids</button>
                </div>
            </div>

            <div id="products" class="products">
                <div class="center">
                    <a href="/shop" data-link class="btn-primary">All foxes</a>
                </div>
            </div>
        </div>
        

        <div class="center">
            <a href="/shop" data-link class="btn-primary">All foxes</a>
        </div>
    `;

    renderProducts(currentProducts);
    initShopEvents();

    document.querySelector('.header').classList.add('header-other');
    document.querySelector('.header').classList.remove('header-main');

    document.querySelector('.logo').classList.add('logo-other');
    document.querySelector('.logo').classList.remove('logo-main');

    document.querySelectorAll('.cart-icon-white').forEach(btn => btn.style.display = 'none');
    document.querySelectorAll('.cart-icon-black').forEach(btn => btn.style.display = 'inline-block');
}

function initShopEvents() {
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filters button");

    if (!searchInput || !filterButtons.length) return;

    // SEARCH
    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();

        const filtered = currentProducts.filter(product =>
            product.title.toLowerCase().includes(value)
        );

        renderProducts(filtered);
    });

    // FILTER
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.dataset.category;

            currentProducts =
                category === "All"
                    ? [...products]
                    : products.filter(p => p.category === category);

            searchInput.value = "";
            renderProducts(currentProducts);
        });
    });
}