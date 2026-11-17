// DEAR CHAPTERS: WEBSITE INTERACTIONS

document.addEventListener("DOMContentLoaded", () => {

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // MOBILE NAVIGATION
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  const closeNav = () => {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  if (menuToggle && mainNav) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-controls", "main-nav");
    mainNav.id = mainNav.id || "main-nav";

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeNav(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 760) closeNav(); });
  }

  // FAQ: KEEP ONE ANSWER OPEN AT A TIME
  const faqItems = document.querySelectorAll(".faq-list details");
  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach(other => { if (other !== item) other.open = false; });
      }
    });
  });

  // A CLOSER LOOK: ARROWS, MOUSE DRAGGING, KEYBOARD
  const gallery = document.querySelector(".inside-gallery");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");

  if (gallery) {
    gallery.setAttribute("tabindex", "0");
    gallery.setAttribute("role", "region");
    gallery.setAttribute("aria-label", "Planner sections. Use the arrow keys to scroll.");

    const step = () => {
      const item = gallery.querySelector(".inside-item");
      if (!item) return 300;
      const gap = parseFloat(getComputedStyle(gallery).columnGap || getComputedStyle(gallery).gap) || 0;
      return item.getBoundingClientRect().width + gap;
    };

    const scrollByStep = dir => {
      gallery.scrollBy({ left: dir * step(), behavior: reduceMotion ? "auto" : "smooth" });
    };

    const updateArrows = () => {
      if (!prevBtn || !nextBtn) return;
      const max = gallery.scrollWidth - gallery.clientWidth - 2;
      prevBtn.disabled = gallery.scrollLeft <= 2;
      nextBtn.disabled = gallery.scrollLeft >= max;
    };

    if (prevBtn) prevBtn.addEventListener("click", () => scrollByStep(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => scrollByStep(1));
    gallery.addEventListener("scroll", () => window.requestAnimationFrame(updateArrows), { passive: true });
    window.addEventListener("resize", updateArrows);
    updateArrows();

    gallery.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") { e.preventDefault(); scrollByStep(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); scrollByStep(-1); }
    });

    let isDragging = false;
    let moved = false;
    let startX = 0;
    let startScrollLeft = 0;

    gallery.addEventListener("pointerdown", e => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      isDragging = true;
      moved = false;
      startX = e.clientX;
      startScrollLeft = gallery.scrollLeft;
      gallery.classList.add("is-dragging");
    });

    window.addEventListener("pointermove", e => {
      if (!isDragging) return;
      const distance = e.clientX - startX;
      if (Math.abs(distance) > 3) moved = true;
      gallery.scrollLeft = startScrollLeft - distance;
    });

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      gallery.classList.remove("is-dragging");
    };
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
  }

  // SCROLL REVEAL (skipped for reduced motion)
  const revealTargets = document.querySelectorAll(
    ".section-topline, .section-title-row, .edition-card, .inside-gallery, .details-list > div, .newhere-card, .price-card, .how-grid article, .story-image, .story-copy, .faq-layout, .ed-card, .ed-strip, .ed-purchase, .ed-other"
  );

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach((el, i) => {
      el.classList.add("reveal");
      if (el.classList.contains("edition-card") || el.classList.contains("newhere-card") || el.classList.contains("ed-card") || el.classList.contains("ed-other")) {
        el.style.transitionDelay = `${(i % 4) * 90}ms`;
      }
      io.observe(el);
    });
  }

  // STICKY MOBILE BUY BAR: show after the hero, hide while pricing is on screen
  const buyBar = document.querySelector(".buy-bar");
  const hero = document.querySelector(".hero");
  const pricing = document.querySelector("#pricing");

  if (buyBar && hero && "IntersectionObserver" in window) {
    let heroGone = false;
    let pricingVisible = false;
    const update = () => buyBar.classList.toggle("is-visible", heroGone && !pricingVisible);

    new IntersectionObserver(([e]) => { heroGone = !e.isIntersecting; update(); }, { threshold: 0 }).observe(hero);
    if (pricing) new IntersectionObserver(([e]) => { pricingVisible = e.isIntersecting; update(); }, { threshold: 0.05 }).observe(pricing);
  }

  // MISSING IMAGES: show a soft placeholder instead of a broken icon
  document.querySelectorAll("img").forEach(img => {
    const mark = () => img.classList.add("img-missing");
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) mark();
    img.addEventListener("error", mark);
  });

});
