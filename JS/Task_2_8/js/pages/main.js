import { loadHtml } from "../utils/html.js";

const templateUrl = new URL("./main.html", import.meta.url);

export async function renderMain() {
    const app = document.getElementById("app");
    app.innerHTML = await loadHtml(templateUrl);

    document.querySelector("header[data-header]").classList.add('header-main');
    document.querySelector("header[data-header]").classList.remove('header-other');
}