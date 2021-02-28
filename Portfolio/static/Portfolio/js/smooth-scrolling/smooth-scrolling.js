function smoothScroll(target, duration) {
    var targetNode = document.querySelector(target);
    var targetY = targetNode.getBoundingClientRect().top - document.querySelector('header').getBoundingClientRect().height;
    var startY = window.pageYOffset;
    var startTime = null;

    function animation(currentTime) {
        if(startTime == null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startY, targetY, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(timeElapsed_, startY_, targetY_, dur_) {
        timeElapsed_ /= dur_ / 2;
        if(timeElapsed_ < 1) return targetY_ / 2 * timeElapsed_ * timeElapsed_ + startY_;
        --timeElapsed_;
        return -targetY_ / 2 * (timeElapsed_ * (timeElapsed_ - 2) - 1) + startY_;
    }

    requestAnimationFrame(animation);
}

var logoLink = document.querySelector('.logo-link');
var profileLink = document.querySelector('.profile-link');
var projectsLink = document.querySelector('.projects-link');
var skillsLink = document.querySelector('.skills-link');
var resumeLink = document.querySelector('.resume-link');
var contactLink = document.querySelector('.contact-link');

logoLink.addEventListener('click', function() {
    smoothScroll('.profile-section', 1000);
});

profileLink.addEventListener('click', function() {
    smoothScroll('.profile-section', 1000);
});

projectsLink.addEventListener('click', function() {
    smoothScroll('.projects-section', 1000);
});

skillsLink.addEventListener('click', function() {
    smoothScroll('.skills-section', 1000);
});

resumeLink.addEventListener('click', function() {
    smoothScroll('.resume-section', 1000);
});

contactLink.addEventListener('click', function() {
    smoothScroll('.contact-section', 1000);
});