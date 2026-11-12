
// Dear Chapters — website interactions

// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.textContent = "☰";
    });
  });
}

// Show product images only after successful loading
document.querySelectorAll(".image-frame img").forEach((image) => {
  const showImage = () => image.classList.add("loaded");

  image.addEventListener("load", showImage);
  image.addEventListener("error", () => image.classList.remove("loaded"));

  if (image.complete && image.naturalWidth > 0) {
    showImage();
  }
});

// Seven-section carousel
const carousel = document.querySelector(".section-carousel");

if (carousel) {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
  const previousButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");
  const carouselWindow = carousel.querySelector(".carousel-window");

  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
      slide.setAttribute("aria-hidden", String(i !== currentSlide));
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);

      if (i === currentSlide) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  previousButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  // Swipe support for phones and tablets
  carouselWindow.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  carouselWindow.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) > 45) {
      showSlide(distance < 0 ? currentSlide + 1 : currentSlide - 1);
    }
  }, { passive: true });

  // Keyboard navigation when the carousel is focused
  carouselWindow.setAttribute("tabindex", "0");

  carouselWindow.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") showSlide(currentSlide + 1);
    if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
  });

  showSlide(0);
}

// Update the copyright year automatically
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Keep purchase links inactive until real Payhip URLs are added
document.querySelectorAll(".purchase-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      link.getAttribute("href") === "#" ||
      link.getAttribute("aria-disabled") === "true"
    ) {
      event.preventDefault();
      alert("The checkout link will be available soon.");
    }
  });
});
