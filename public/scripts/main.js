document.addEventListener("DOMContentLoaded", () => {
  activarScrollSuave();
  activarHeaderScroll();
});

function activarScrollSuave() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const destino = document.querySelector(link.getAttribute("href"));
      if (destino) {
        e.preventDefault();
        destino.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function activarHeaderScroll() {
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    header.style.boxShadow =
      window.scrollY > 20 ? "0 4px 14px rgba(0,0,0,0.12)" : "none";
  });
}
