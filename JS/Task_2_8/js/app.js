import { router } from "./router.js";
import { renderCart, openCart, initCartUi } from "./cart.js";

renderCart();
initCartUi();

if (!window.location.hash) {
    window.location.hash = "#/";
}

router();

window.addEventListener("hashchange", () => router());

document.querySelectorAll(".cart-icon-black, .cart-icon-white")
    .forEach(btn => btn.addEventListener("click", openCart));


const burger = document.querySelector("[data-menu-open]");
const mobileMenu = document.querySelector("[data-menu]");
const overlay = document.querySelector("[data-menu-overlay]");

function closeMenu() {
    mobileMenu?.classList.remove("open");
    overlay?.classList.remove("show");
}

burger?.addEventListener("click", () => {
    mobileMenu?.classList.add("open");
    overlay?.classList.add("show");
});

document.addEventListener("click", (e) => {
    if (e.target.closest("[data-menu-close]") || e.target === overlay) {
        closeMenu();
    }
});

mobileMenu?.addEventListener("click", (e) => {
    if (e.target.closest("[data-link]"))
        closeMenu();
});