import { renderBreadcrumb } from "./breadcrumb.js";
import { renderMain } from "./pages/main.js";
import { renderShop } from "./pages/shop.js";
import { renderAbout } from "./pages/about.js";

const routes = {
    "/": {
        title: "Home",
        breadcrumbEl: ["Home"],
        render: renderMain,
    },
    "/shop": {
        title: "All Items",
        breadcrumbEl: ["Home", "All items"],
        render: renderShop,
    },
    "/about": {
        title: "Our history",
        breadcrumbEl: ["Home", "About Us"],
        render: renderAbout,
    }
};

document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    router();
});

export function router() {
    const path = window.location.pathname;
    const route = routes[path] || routes["/"];

    route.render();
    renderBreadcrumb(route);
}