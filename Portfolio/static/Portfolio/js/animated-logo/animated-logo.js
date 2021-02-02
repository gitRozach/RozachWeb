/* Gets SVG path length for each character -> CSS Animation */
const logo = document.querySelectorAll("#logo-text path");

for (let i = 0; i < logo.length; ++i) {
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}