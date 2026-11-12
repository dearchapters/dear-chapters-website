
// DEAR CHAPTERS — WEBSITE INTERACTIONS

document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // FAQ: KEEP ONE ANSWER OPEN AT A TIME
  const faqItems = document.querySelectorAll(".faq-list details");

  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.open = false;
          }
        });
      }
    });
  });

  // A CLOSER LOOK: HORIZONTAL CAROUSEL
  const gallery = document.querySelector(".inside-gallery");
  const previousButton = document.querySelector(".gallery-prev");
  const nextButton = document.querySelector(".gallery-next");

  if (gallery) {
    const scrollAmount = () => gallery.clientWidth * 0.8;

    previousButton?.addEventListener("click", () => {
      gallery.scrollBy({
        left: -scrollAmount(),
        behavior: "smooth"
      });
    });

    nextButton?.addEventListener("click", () => {
      gallery.scrollBy({
        left: scrollAmount(),
        behavior: "smooth"
      });
    });
  }

});
