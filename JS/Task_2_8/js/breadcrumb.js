export function renderBreadcrumb(route) {
    const breadcrumbEl = document.querySelector("[data-breadcrumb]");
    const titleEl = document.querySelector("[data-page-title]");

    if (!breadcrumbEl || !titleEl) return;

    const breadcrumb = Array.isArray(route.breadcrumb) ? route.breadcrumb : [];

    const items = breadcrumb
        .map((item, index, array) => {
            const isLast = index === array.length - 1;

            if (isLast) {
                return `<li>${item.label}</li>`;
            }

            return `<li><a href="${item.path}" data-link>${item.label}</a></li>`;
        })
        .join("");

    breadcrumbEl.innerHTML = `<nav><ul>${items}</ul></nav>`;
    titleEl.textContent = route.title;
}