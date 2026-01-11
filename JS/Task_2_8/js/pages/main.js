export function renderMain() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <section class="hero">
            <img class="hero-bg" src="images/hero-fox.png" alt="Hero Fox">
            <div class="hero-content">
                <h1>Discover foxlife</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur.
                    Molestie turpis turpis fermentum.
                </p>
            </div>
        </section>

        <section class="features">
            <div class="feature-card">
                <img src="images/chicken.png" alt="Chicken">
                <h3>Food</h3>
                <p>Lorem ipsum dolor sit amet ipsum</p>
            </div>

            <div class="feature-card">
                <img src="images/rooster.png" alt="Rooster">
                <h3>Office</h3>
                <p>Lorem ipsum dolor sit amet ipsum</p>
            </div>

            <div class="feature-card">
                <img src="images/fox.png" alt="Fox">
                <h3>House</h3>
                <p>Lorem ipsum dolor sit amet ipsum</p>
            </div>
        </section>

        <div class="center">
            <a href="/shop" data-link class="btn-primary">All foxes</a>
        </div>

        <section class="newsletter">
            <h2>Join our newsletter</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur.
                Molestie turpis turpis fermentum.
            </p>

            <form>
                <input type="email" placeholder="Enter email">
                <button>Subscribe</button>
            </form>
        </section>
    `;
}