export function renderBreadcrumb(route) {
    const breadcrumbEl = document.getElementById("breadcrumb");
    const titleEl = document.getElementById("page-title");

    if (!breadcrumbEl || !titleEl) return;

    const items = route.breadcrumbEl
        .map((item, index, array) => {
            const isLast = index === array.length - 1;
            
            if (isLast) {
                return `<li>${item}</li>`;
            } else {
                const href = index === 0 ? "/" : `/${item}`;
                return `<li><a href="${href}" data-link>${item}</a></li>`;
            }
        })
        .join("");

    breadcrumbEl.innerHTML = `<nav><ul>${items}</ul></nav>`;
    titleEl.textContent = route.title;
}