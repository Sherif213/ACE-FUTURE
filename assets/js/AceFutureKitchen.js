window.addEventListener('scroll', function() {
    const parallax = document.getElementById('parallax');
    const header = document.querySelector('.header'); // Select the hidden header
    const parallaxBottom = parallax.getBoundingClientRect().bottom;

    // Check if the parallax container is scrolled past
    if (parallaxBottom <= 0) {
        // Fade out the parallax section and collapse its space
        parallax.style.transition = 'opacity 1s ease-out, height 0.5s ease-out';
        parallax.style.opacity = '0'; // Start fading out the opacity

        // Collapse the height after the opacity transition
        setTimeout(() => {
            parallax.style.height = '0'; // Collapse the height
        }, 1000); // Wait for the opacity transition to complete

        // Make the header visible after the parallax section fades out
        setTimeout(() => {
            header.style.visibility = 'visible'; // Make the header visible
            header.style.opacity = '1'; // Add smooth visibility if you want it to fade in
            header.style.transition = 'opacity 0.5s ease-in'; // Transition for header appearance
        }, 1500); // Wait for the height transition to complete

        // Optionally remove the parallax from the DOM after collapse
        setTimeout(() => {
            parallax.style.display = 'none'; // Fully remove it from the DOM
        }, 1500); // This can be adjusted if you don't want to remove it
    }
});

