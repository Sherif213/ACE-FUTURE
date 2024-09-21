"use strict";

/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const texts = [
  {
    title: "Specialized in general contracting since 200 AD.",
    text: "We expanded into industrial cooling due to growing food storage needs in Saudi Arabia. We now excel in creating and maintaining refrigeration warehouses, partnering with major UK companies."
  },
  {
    title: "Innovative Solutions for Modern Infrastructure.",
    text: "We leverage cutting-edge technologies to develop sustainable infrastructure solutions that meet the needs of a rapidly evolving market."
  },
  {
    title: "Pioneering Refrigeration Technologies.",
    text: "Our refrigeration systems are designed to offer energy-efficient solutions, ensuring reliable cold storage for industries around the world."
  }
];

const initSlider = function (currentSlider) {
  const sldierContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let currentSlidePos = 0;

  const heroTitle = document.getElementById("hero-title");
  const heroText = document.getElementById("hero-text");

  const updateText = function () {
    // Add fade-out class to initiate the fade-out animation
    heroTitle.classList.add("fade-out");
    heroText.classList.add("fade-out");

    // After the fade-out completes, update text and apply fade-in
    setTimeout(() => {
      // Update the title and text with the new content
      heroTitle.textContent = texts[currentSlidePos].title;
      heroText.textContent = texts[currentSlidePos].text;

      // Ensure re-triggering of the fade-in by adding and removing the class
      setTimeout(() => {
        heroTitle.classList.add("fade-in");
        heroText.classList.add("fade-in");
      }, 5); // small timeout to allow CSS reflow
    }, 1); // 500ms for the fade-out effect
  };

  const moveSliderItem = function () {
    sldierContainer.style.transform = `translateX(-${sldierContainer.children[currentSlidePos].offsetLeft}px)`;
  };

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= sldierContainer.childElementCount - 1;
    const video = document.getElementById("hero-video");
    const playButton = document.getElementById("play-button");

    if (!video.paused) {
      video.pause();
      playButton.style.display = "block";
    }

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    updateText(); // Update text on slide change
    moveSliderItem();
  };

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = sldierContainer.childElementCount - 1;
    } else {
      currentSlidePos--;
    }

    updateText(); // Update text on slide change
    moveSliderItem();
  };

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = sldierContainer.childElementCount <= 1;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }
};

for (let i = 0, len = sliders.length; i < len; i++) {
  initSlider(sliders[i]);
}



/**************************\
|                          |
|      * Video Settings *   |
|                          |
\**************************/

const video = document.getElementById("hero-video");
const playButton = document.getElementById("play-button");

// Play video when the play button is clicked and hide the button
playButton.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    playButton.style.display = "none"; // Hide play button after video starts
  }
});

// Add event listener to the video itself to toggle play/pause on click
video.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    playButton.style.display = "none";
  } else {
    video.pause();
    playButton.style.display = "block"; // Show the play button when video is paused
  }
});

/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function (currentAccordion) {
  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  const expandAccordion = function () {
    if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
      lastActiveAccordion.classList.remove("expanded");
    }

    currentAccordion.classList.toggle("expanded");

    lastActiveAccordion = currentAccordion;
  };

  accordionBtn.addEventListener("click", expandAccordion);
};

for (let i = 0, len = accordions.length; i < len; i++) {
  initAccordion(accordions[i]);
}
