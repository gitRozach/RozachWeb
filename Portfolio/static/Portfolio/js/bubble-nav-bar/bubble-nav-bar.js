/* Navigation-Bar selection bubble */
const sections = document.querySelectorAll('section');
const selectionBubble = document.querySelector('.selection-bubble');
const options = {threshold: 0.7};
const gradients = [
    "linear-gradient(to right bottom, gray, gray)", 
    "linear-gradient(to right bottom, rgba(255, 215, 0), rgba(255, 215, 0))", 
    "linear-gradient(to right bottom, rgba(138, 43, 226), rgba(138, 43, 226))", 
    "linear-gradient(to right bottom, rgba(0, 128, 0), rgba(0, 128, 0))", 
    "linear-gradient(to right bottom, rgba(25, 25, 112), rgba(25, 25, 112))"
];

let sectionObserver = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
    entries.forEach(entry => {
        const className = entry.target.className;
        const activeAnchor = document.querySelector(`[data-page=${className}]`);
        const gradientIndex = entry.target.getAttribute('data-index');
        const coords = activeAnchor.getBoundingClientRect();
        
        const directions = {
            left: coords.left,
            top: coords.top,
            height: coords.height,
            width: coords.width
        };

        if (entry.isIntersecting) {
            selectionBubble.style.setProperty('left', `${directions.left}px`);
            selectionBubble.style.setProperty('top', `${directions.top}px`);
            selectionBubble.style.setProperty('width', `${directions.width}px`);
            selectionBubble.style.setProperty('height', `${directions.height}px`);
            selectionBubble.style.background = gradients[gradientIndex];
        }
    });
}

sections.forEach(section => {
    sectionObserver.observe(section);
});