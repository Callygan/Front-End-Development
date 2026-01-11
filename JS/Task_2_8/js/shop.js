// import { products } from "./data.js";
// import { renderProducts } from "./render.js";

// let currentProducts = [...products];

// export function renderShop() {
//     const app = document.getElementById("app");

//     app.innerHTML = `
//         <h1>All items</h1>

//         <div class="controls">
//             <input type="text" id="searchInput" placeholder="Search"/>

//             <div class="filters">
//                 <button data-category="All">All</button>
//                 <button data-category="Forest">Forest</button>
//                 <button data-category="Fox kids">Fox kids</button>
//             </div>
//         </div>

//         <div id="products" class="products"></div>
//     `;

//     renderProducts(currentProducts);
//     initShopEvents();
// }

// function initShopEvents() {
//     const searchInput = document.getElementById("searchInput");
//     const filterButtons = document.querySelectorAll(".filters button");

//     if (!searchInput || !filterButtons.length) return;

//     // SEARCH
//     searchInput.addEventListener("input", (e) => {
//         const value = e.target.value.toLowerCase();

//         const filtered = currentProducts.filter(product =>
//             product.title.toLowerCase().includes(value)
//         );

//         renderProducts(filtered);
//     });

//     // FILTER
//     filterButtons.forEach(btn => {
//         btn.addEventListener("click", () => {
//             const category = btn.dataset.category;

//             currentProducts =
//                 category === "All"
//                     ? [...products]
//                     : products.filter(p => p.category === category);

//             searchInput.value = "";
//             renderProducts(currentProducts);
//         });
//     });
// }