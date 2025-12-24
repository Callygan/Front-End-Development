import { renderShop } from "./shop.js";

export function router() {
    const path = window.location.pathname;
    const app = document.getElementById("app");

    if (path === "/") {
        app.innerHTML = "<h1>Home</h1>";
    }

    if (path === "/shop") {
        renderShop();
    }

    if (path === "/about") {
        app.innerHTML = "<h1>Our history</h1>";
    }
}

document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.href);
    router();
});
