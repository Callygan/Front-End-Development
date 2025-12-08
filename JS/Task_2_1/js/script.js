const button = document.getElementById('changeColorBtn');
const colorValue = document.getElementById('colorValue');

function generateRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
}

button.addEventListener( 'click', () => {
    const newColor = generateRandomColor();
    document.body.style.backgroundColor = newColor;
    colorValue.textContent = newColor;
    colorValue.style.color = newColor;
});