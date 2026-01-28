import { renderBreadcrumb } from "./breadcrumb.js";
import { renderMain } from "./pages/main.js";
import { renderShop } from "./pages/shop.js";
import { renderAbout } from "./pages/about.js";

const routes = {
    "/": {
        title: "Home",
        breadcrumb: [{ label: "Home", path: "/" }],
        render: renderMain,
    },
    "/shop": {
        title: "All Items",
        breadcrumb: [
            { label: "Home", path: "/" },
            { label: "All items", path: "/shop" },
        ],
        render: renderShop,
    },
    "/about": {
        title: "Our history",
        breadcrumb: [
            { label: "Home", path: "/" },
            { label: "About Us", path: "/about" },
        ],
        render: renderAbout,
    }
};

document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    const href = link.getAttribute("href") || "/";
    const targetHash = `#${href}`;
    if (window.location.hash === targetHash) {
        router();
        return;
    }

    window.location.hash = targetHash;
});

function getPathFromHash() {
    const hash = window.location.hash || "#/";
    const path = hash.replace(/^#/, "");
    return path.startsWith("/") ? path : `/${path}`;
}

function setActiveNav(path) {
    const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");

    document.querySelectorAll('a[data-link]').forEach((a) => {
        a.classList.remove("is-active");
        if (a.getAttribute("aria-current") === "page") {
            a.removeAttribute("aria-current");
        }

        const href = a.getAttribute("href") || "/";
        const normalizedHref = href === "/" ? "/" : href.replace(/\/$/, "");

        if (normalizedHref === normalizedPath) {
            a.classList.add("is-active");
            a.setAttribute("aria-current", "page");
        }
    });
}

export async function router() {
    const path = getPathFromHash();
    const route = routes[path] || routes["/"];

    await route.render();
    renderBreadcrumb(route);
    setActiveNav(path);
}