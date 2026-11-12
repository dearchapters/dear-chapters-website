
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

  // A CLOSER LOOK: MOUSE DRAGGING
  const gallery = document.querySelector(".inside-gallery");

  if (gallery) {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    gallery.addEventListener("pointerdown", event => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;

      isDragging = true;
      startX = event.clientX;
      startScrollLeft = gallery.scrollLeft;
      gallery.classList.add("is-dragging");
    });

    window.addEventListener("pointermove", event => {
      if (!isDragging) return;

      const distance = event.clientX - startX;
      gallery.scrollLeft = startScrollLeft - distance;
    });

    window.addEventListener("pointerup", () => {
      isDragging = false;
      gallery.classList.remove("is-dragging");
    });

    window.addEventListener("pointercancel", () => {
      isDragging = false;
      gallery.classList.remove("is-dragging");
    });
  }

});
