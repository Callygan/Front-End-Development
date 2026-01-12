export function renderMain() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <section class="hero">
            <img class="hero-bg" src="images/hero-fox.png" alt="Hero Fox">
            <div class="hero-content">
                <h1 class="hero-title">Discover foxlife</h1>
                <p class="hero-text">
                    Lorem ipsum dolor sit amet consectetur. Phar 
                    eget turpis sem ultricies  dolor sit amet consectetur.
                </p>
            </div>
        </section>

        <section class="features">
            <div class="feature-card">
                <div class="features-content">
                    <h3>#Food</h3>
                    <p>Lorem ipsum dolor sit amet ipsum</p>
                </div>
                <img src="images/chicken.png" alt="Chicken">
            </div>

            <div class="feature-card">
                <img src="images/rooster.png" alt="Rooster">
                <div class="features-content">
                    <h3>#Office</h3>
                    <p>Lorem ipsum dolor sit amet ipsum</p>
                </div>
            </div>

            <div class="feature-card">
                <div class="features-content">
                    <h3>#House</h3>
                    <p>Lorem ipsum dolor sit amet ipsum</p>
                </div>
                <img src="images/fox.png" alt="Fox">
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

    document.querySelector('.header').classList.add('header-main');
    document.querySelector('.header').classList.remove('header-other');

    document.querySelector('.logo').classList.add('logo-main');
    document.querySelector('.logo').classList.remove('logo-other');

    document.querySelectorAll('.cart-icon-white').forEach(btn => btn.style.display = 'inline-block');
    document.querySelectorAll('.cart-icon-black').forEach(btn => btn.style.display = 'none');
}