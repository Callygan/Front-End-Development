import { router } from "./router.js";
import { renderCart, openCart, initCartUi } from "./cart.js";

renderCart();
initCartUi();

router();


window.addEventListener("popstate", router);

document.querySelectorAll(".cart-icon-black, .cart-icon-white")
    .forEach(btn => btn.addEventListener("click", openCart));


const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".menu-overlay");
const closeBtn = document.querySelector(".close-menu");

burger.addEventListener("click", () => {
    mobileMenu.classList.add("open");
    overlay.classList.add("show");
});

closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

mobileMenu.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (!link) return;
  closeMenu();
});

function closeMenu() {
    mobileMenu.classList.remove("open");
    overlay.classList.remove("show");
}