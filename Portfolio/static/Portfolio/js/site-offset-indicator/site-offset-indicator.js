/* Dynamic Progress-Bar representing the current vertical scroll value */
let progressBar = document.getElementById('progress-bar');
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
    let progressBarWidth = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = progressBarWidth + "%";
    if (progressBarWidth == 0) multipleSplats(10);
    if (progressBarWidth == 100) multipleSplats(10);
}
