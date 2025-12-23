const countriesContainer = document.getElementById("countriesContainer");
const searchInput = document.getElementById("searchInput");
const regionSelect = document.getElementById("regionSelect");
const regionWrapper = document.getElementById("regionWrapper");
const themeToggle = document.getElementById("theme");
const lightBtn = document.getElementById("lightBtn");
const darkBtn = document.getElementById("darkBtn");
const allowedRegions = ["Americas", "Asia", "Europe"];

let countriesData = [];

/* Fetch countries */
async function fetchCountries() {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital");

    const data = await res.json();

    const filteredByRegion = data.filter(country =>
        allowedRegions.includes(country.region)
    );

    countriesData = filteredByRegion.slice(0, 20);

    renderCountries(countriesData);
}

// Render countries
function renderCountries(list) {
    countriesContainer.innerHTML = "";

    list.forEach(country => {
        const card = document.createElement("div");
        card.className = "country-card";

        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <div class="country-info">
                <h3>${country.name.common}</h3>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            </div>
            `;

        countriesContainer.appendChild(card);
    });
}

/* Search */
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = countriesData.filter(c =>
        c.name.common.toLowerCase().includes(value)
    );
    renderCountries(filtered);
});

/* Filter by region */
regionSelect.addEventListener("change", () => {
    const selectedRegion = regionSelect.value;
    if (!selectedRegion) {
        renderCountries(countriesData);
    } else {
        const filtered = countriesData.filter(c => c.region === selectedRegion);
        renderCountries(filtered);
    }
});

// Theme toggle implementation
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");

    lightBtn.style.display = isDark ? "none" : "block";
    darkBtn.style.display = isDark ? "block" : "none";
});

// Custom select dropdown behavior
regionSelect.addEventListener("mousedown", () => {
    regionWrapper.classList.toggle("open");
});

regionSelect.addEventListener("blur", () => {
    regionWrapper.classList.remove("open");
});

regionSelect.addEventListener("change", () => {
    regionWrapper.classList.remove("open");
});

fetchCountries();