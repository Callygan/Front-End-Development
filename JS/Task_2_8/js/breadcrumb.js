export function renderBreadcrumb(route) {
    const breadcrumbEl = document.getElementById("breadcrumb");
    const titleEl = document.getElementById("page-title");

    if (!breadcrumbEl || !titleEl) return;

    breadcrumbEl.innerHTML = route.breadcrumbEl
        .map((item, index) => {
            if (index === 0) {
                return `<a href="/" data-link>${item}</a>`;
            }
            return `/${item}`;
        })
        .join("");

        titleEl.textContent = route.title;
}