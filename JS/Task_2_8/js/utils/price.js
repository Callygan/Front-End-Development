export function parsePrice(value) {
    if (typeof value === "number") return value;

    const normalized = String(value ?? "")
        .replace(/[^0-9,.-]/g, "")
        .replace(/,/g, ".");

    const num = Number(normalized);
    return Number.isFinite(num) ? num : 0;
}