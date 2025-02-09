/**
 * =====================================
 *           CONFIGURAÇÕES
 * =====================================
 * Variáveis globais e constantes
 */
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const carouselSlide = document.querySelector(".carousel-slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentSlide = 0;
const totalSlides = document.querySelectorAll(".carousel-slide img").length;

/**
 * =====================================
 *           GERENCIADOR DE TEMA
 * =====================================
 */
function toggleTheme() {
  const isDark = body.getAttribute("data-theme") === "dark";
  body.setAttribute("data-theme", isDark ? "light" : "dark");
  localStorage.setItem("theme", isDark ? "light" : "dark");

  // Atualiza ícone
  const icon = themeToggle.querySelector("i");
  icon.className = isDark ? "fa-solid fa-moon" : "fa-solid fa-sun";
}

// Carrega tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  themeToggle.querySelector("i").className =
    savedTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

/**
 * =====================================
 *           MENU MOBILE
 * =====================================
 */
function toggleMenu() {
  navMenu.classList.toggle("active");
  menuToggle.querySelector("i").classList.toggle("fa-xmark");
}

// Fecha menu ao clicar fora
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove("active");
    menuToggle.querySelector("i").classList.remove("fa-xmark");
  }
});

/**
 * =====================================
 *           CARROSSEL
 * =====================================
 */
function goToSlide(n) {
  currentSlide = (n + totalSlides) % totalSlides;
  carouselSlide.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));

// Auto avanço (opcional)
let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);

// Pausa ao passar mouse
carouselSlide.parentElement.addEventListener("mouseenter", () =>
  clearInterval(autoPlay)
);
carouselSlide.parentElement.addEventListener("mouseleave", () => {
  autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
});

/**
 * =====================================
 *           EVENT LISTENERS
 * =====================================
 */
themeToggle.addEventListener("click", toggleTheme);
menuToggle.addEventListener("click", toggleMenu);
