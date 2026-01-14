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
                <div class="search">
                    <input type="text" id="search__input" placeholder="Search"/>
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                        <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                        ></path>
                        </g>
                    </svg>
                </div>

                <div class="filters">
                    <h5>Topic</h5>
                    <button data-category="All">All</button>
                    <button data-category="Forest">Forest</button>
                    <button data-category="Fox kids">Fox kids</button>
                    <button data-category="Others">Others</button>

                    <div class="slider-container">
                        <h5>Price:</h5>
                        <div class="slider-value">
                            <input type="range" id="income" name="income" min="0" max="200" step="1 value="50">
                            <span id="income-value"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div id="products" class="products"></div>
                <div class="center">
                    <a href="/shop" data-link class="btn-primary">All foxes</a>
                </div>
            </div>

        </div>
    `;

    function initIncomeSlider() {
        const slider = document.getElementById("income");
        const valueEl = document.getElementById("income-value");

        if (!slider || !valueEl) return;

        const update = () => {
            const value = Number(slider.value);
            valueEl.textContent = `Value: $${value}`;

            const percent =
                ((slider.value - slider.min) / (slider.max - slider.min)) * 100;

            slider.style.setProperty("--slider-left", percent + "%");
        };

        update();
        slider.addEventListener("input", update);
    }

    renderProducts(currentProducts);
    initShopEvents();
    initIncomeSlider();

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