const cache = new Map();

export async function loadHtml(url) {
    const key = String(url);
    if (cache.has(key)) return cache.get(key);

    const res = await fetch(key, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${key}: ${res.status}`);

    const html = await res.text();
    cache.set(key, html);
    return html;
}
