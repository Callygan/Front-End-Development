const slider = document.getElementById('income');
function updateSliderGradient() {
    const min = Number(slider.min);
    const max = Number(slider.max);
    const val = Number(slider.value);
    const percent = ((max - val) / (max - min)) * 100;
    slider.style.setProperty('--slider-right', percent + '%');
}
if (slider) {
    updateSliderGradient();
    slider.addEventListener('input', updateSliderGradient);
}
document.addEventListener('DOMContentLoaded', () => {
    const incomeSlider = document.getElementById('income');
    const incomeValue = document.getElementById('income-value');

    incomeSlider.addEventListener('input', () => {
        const value = parseInt(incomeSlider.value, 10);
        incomeValue.textContent = `${value / 1000}k`;
    });
} );