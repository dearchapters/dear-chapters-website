// Dear Chapters — small interactions for the single-page website

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

// Show a product image only after the browser successfully loads it.
// If you have not uploaded an image yet, the tasteful colour placeholder remains visible.
document.querySelectorAll(".image-frame img").forEach((image) => {
  const showImage = () => image.classList.add("loaded");
  image.addEventListener("load", showImage);
  image.addEventListener("error", () => image.classList.remove("loaded"));
  if (image.complete && image.naturalWidth > 0) showImage();
});

// Update the copyright year automatically.
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Purchase buttons remain safely inactive until real Payhip URLs are added.
document.querySelectorAll(".purchase-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#" || link.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
      alert("This edition's checkout link will be available soon.");
    }
  });
});
