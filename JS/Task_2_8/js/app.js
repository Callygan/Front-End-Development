import { router } from "./router.js";
import { renderCart, openCart, initCartUi } from "./cart.js";

renderCart();
initCartUi();

router();


window.addEventListener("popstate", router);

document.querySelectorAll(".cart-icon-black, .cart-icon-white")
    .forEach(btn => btn.addEventListener("click", openCart));
