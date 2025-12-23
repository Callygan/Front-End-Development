const routes = {
    "/": renderHome,
    "/shop": renderShop,
    "/about": renderAbout
};

export function router() {
    const path = location.pathname;
    router[path]?.();
}

document.addEventListener("click", e => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.href);
    router();
});

exort function router() {
    const app = document.getElementById("app");
    const path = window.location.pathname;

    if (path === "/") {
        app.innerHTML = `<h1>Home</h1>`;
    }

    if (path === "/shop") {
        app.innerHTML = `<h1>Shop</h1>`;
    }

    if (path === "/about") {
        app.innerHTML = `<h1>Out history</h1>`;
    }
}

document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.href);
    router();
});