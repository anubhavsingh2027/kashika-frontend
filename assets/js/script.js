
 document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const slideshow = document.querySelector('.slideshow');
  const indicatorsContainer = document.querySelector('.indicators');
  let currentSlide = 0;
  slides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      indicator.dataset.index = index;
      if (index === 0) indicator.classList.add('active');
      indicatorsContainer.appendChild(indicator);
  });
  function showSlide(index) {
      if (index < 0) {
          currentSlide = slides.length - 1;
      } else if (index >= slides.length) {
          currentSlide = 0;
      } else {
          currentSlide = index;
      }
      slideshow.style.transform = `translateX(-${100 * currentSlide}vw)`;
      const activeIndicator = indicatorsContainer.querySelector('.active');
      activeIndicator.classList.remove('active');
      indicatorsContainer.children[currentSlide].classList.add('active');
  }
  let autoSlideInterval = setInterval(function () {
      showSlide(currentSlide + 1);
  }, 5000);
  indicatorsContainer.addEventListener('click', function (e) {
      if (e.target && e.target.classList.contains('indicator')) {
          clearInterval(autoSlideInterval);
          showSlide(Number(e.target.dataset.index));
          autoSlideInterval = setInterval(function () {
              showSlide(currentSlide + 1);
          }, 5000);
      }
  });
  showSlide(0);
});

  function updateBannerForMobile() {
    const isMobile = window.matchMedia("(max-width: 550px)").matches;
    const slides = document.querySelectorAll(".slideshow .slide");

    // Check if second image exists
    if (slides.length >= 2) {
      if (isMobile) {
        // Change to banner2.png for mobile
        slides[1].src = "banner2.png";
      } else {
        // Restore original image for larger screens
        slides[1].src = "http://kashikatravel.com/images/bannerbg2.jpg";
      }
    }
  }

  // Run on page load
  updateBannerForMobile();

  // Run whenever screen size changes
  window.addEventListener("resize", updateBannerForMobile);


 function toggleNav() {
    const nav = document.querySelector('.mobile-nav-links');
    nav.classList.toggle('active');
  }

  function disableNavLinks() {
    const nav = document.querySelector('.mobile-nav-links');
    nav.classList.remove('active');
  }


document.addEventListener("input", (event) => {
  if (event.target.tagName === "TEXTAREA") {
      autoResizeTextarea(event.target);
  }
});
function autoResizeTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

