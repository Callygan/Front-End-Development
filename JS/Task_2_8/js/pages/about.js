export function renderAbout() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <section class="about-header">
            <span id="breadcrumb"></span>
            <h1 id="page-title"></h1>
        </section>
        
        <section class="about-section">
            <section class="about-content">
                <div class="about-content-text">
                    <h3>Lorem ipsum dolor sit amet ipsum</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur. Amet aliquam non congue vivamus. Viverra consequat donec fringilla dolor phasellus nibh ultricies purus. Id netus semper feugiat elit turpis convallis platea. Aliquam semper in amet vitae sit augue non. Sit arcu phasellus morbi diam nullam. Proin lorem nunc ante aliquam mauris nunc. Egestas leo orci pellentesque cras. Vitae id enim amet dolor tellus dignissim id mattis. 
                        <br>
                        <br>
                        Augue dis nunc eu tempus habitant eu.Lorem ipsum dolor sit amet consectetur. Amet aliquam non congue vivamus. Viverra consequat donec fringilla dolor phasellus nibh ultricies purus. Id netus semper feugiat elit turpis convallis platea. Aliquam semper in amet vitae sit augue non. Sit arcu phasellus morbi diam nullam. Proin lorem nunc ante aliquam mauris nunc. Egestas leo orci pellentesque cras. Vitae id enim amet dolor tellus dignissim id mattis. Augue dis nunc eu tempus habitant eu.
                    </p>
                </div>
                <img src="images/two-foxes.png" alt="Two Foxes">
            </section>

            <section class="about-content">
                <img src="images/one-fox.png" alt="One Fox">
                <div class="about-content-text">
                    <h3>Lorem ipsum dolor sit amet ipsum</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur. Amet aliquam non congue vivamus. Viverra consequat donec fringilla dolor phasellus nibh ultricies purus. Id netus semper feugiat elit turpis convallis platea. Aliquam semper in amet vitae sit augue non. Sit arcu phasellus morbi diam nullam. Proin lorem nunc ante aliquam mauris nunc. Egestas leo orci pellentesque cras. Vitae id enim amet dolor tellus dignissim id mattis. 
                        <br>
                        <br>
                        Augue dis nunc eu tempus habitant eu.Lorem ipsum dolor sit amet consectetur. Amet aliquam non congue vivamus. Viverra consequat donec fringilla dolor phasellus nibh ultricies purus. Id netus semper feugiat elit turpis convallis platea. Aliquam semper in amet vitae sit augue non. Sit arcu phasellus morbi diam nullam. Proin lorem nunc ante aliquam mauris nunc. Egestas leo orci pellentesque cras. Vitae id enim amet dolor tellus dignissim id mattis. Augue dis nunc eu tempus habitant eu.
                    </p>
                </div>
            </section>
        </section>
    `;

    document.querySelector('.header').classList.add('header-other');
    document.querySelector('.header').classList.remove('header-main');

    document.querySelector('.logo').classList.add('logo-other');
    document.querySelector('.logo').classList.remove('logo-main');

    document.querySelectorAll('.cart-icon-white').forEach(btn => btn.style.display = 'none');
    document.querySelectorAll('.cart-icon-black').forEach(btn => btn.style.display = 'inline-block');
}