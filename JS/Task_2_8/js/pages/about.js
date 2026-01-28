import { loadHtml } from "../utils/html.js";

const templateUrl = new URL("./about.html", import.meta.url);

export async function renderAbout() {
    const app = document.getElementById("app");
    app.innerHTML = await loadHtml(templateUrl);

    document.querySelector("header[data-header]").classList.add('header-other');
    document.querySelector('header[data-header]').classList.remove('header-main');
}