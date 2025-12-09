// Select all filter buttons and cards
const buttons = document.querySelectorAll('.filter button');
const cards = document.querySelectorAll('.fox-card');

// Variable to keep track of the currently active filter
let activeFilter = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.id; // Get the filter id from the button

        // Verify if the clicked button is already active
        if (activeFilter === filter) {
            // If it is, reset the filter to show all cards
            cards.forEach(card => {
                card.style.display = 'grid'; // Correctly set the display property
            });
            activeFilter = null; // Reset active filter
            button.classList.remove('active'); // Remove active class from button
        } else {
            // If it's a new filter, apply it
            cards.forEach(card => {
                const cardType = card.getAttribute('data-type'); // Get the type of the card
                if (cardType === filter) {
                    card.style.display = 'grid'; // Show matching cards
                } else {
                    card.style.display = 'none'; // Hide non-matching cards
                }
            });

            // Update active filter
            activeFilter = filter;

            // Add active class to the clicked button and remove from others
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active'); // Add active class to the clicked button
        }
    });
});