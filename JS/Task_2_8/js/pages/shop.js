import { products } from "../data.js";
import { renderProducts } from "../render.js";
import { parsePrice } from "../utils/price.js";
import { loadHtml } from "../utils/html.js";

const templateUrl = new URL("./shop.html", import.meta.url);

let currentProducts = [...products];

let selectedCategory = "All";
let searchQuery = "";
let maxPrice = null;

function normalizeCategory(value) {
    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/s$/, "");
}

function applyFilters() {
    let list = [...products];

    if (selectedCategory !== "All") {
        const selected = normalizeCategory(selectedCategory);
        list = list.filter(p => normalizeCategory(p.category) === selected);
    }

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter(p => String(p.title ?? "").toLowerCase().includes(q));
    }

    if (maxPrice != null) {
        list = list.filter(p => parsePrice(p.price) <= maxPrice);
    }

    currentProducts = list;
    renderProducts(currentProducts);
}

export async function renderShop() {
    // Reset the filters
    currentProducts = [...products];
    selectedCategory = "All";
    searchQuery = "";
    maxPrice = null;

    const app = document.getElementById("app");

    app.innerHTML = await loadHtml(templateUrl);

    function initIncomeSlider() {
        const slider = document.querySelector("[data-income-input]");
        const valueEl = document.querySelector("[data-income-value]");

        if (!slider || !valueEl) return;

        const update = () => {
            const value = Number(slider.value);
            valueEl.textContent = `Value: $${value}`;

            maxPrice = value;
            applyFilters();

            const percent =
                ((slider.value - slider.min) / (slider.max - slider.min)) * 100;

            slider.style.setProperty("--slider-left", percent + "%");
        };

        update();
        slider.addEventListener("input", update);
    }

    initShopEvents();
    initIncomeSlider();
    applyFilters();

    document.querySelector("header[data-header]").classList.add('header-other');
    document.querySelector("header[data-header]").classList.remove('header-main');
}

function initShopEvents() {
    const searchInput = document.getElementById("search__input");
    const filterButtons = document.querySelectorAll(".filters button");

    // SEARCH
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = String(e.target.value ?? "").trim();
            applyFilters();
        });
    }

    // FILTER
    if (filterButtons.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                selectedCategory = btn.dataset.category ?? "All";

                searchQuery = "";
                if (searchInput) searchInput.value = "";

                applyFilters();
            });
        });
    }
}