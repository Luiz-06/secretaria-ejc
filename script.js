const SENHA_CORRETA = "ejc16";

const integrantes = [
  { nome: "Ana Clara", foto: "assets/integrantes/anaclra.jpeg", categoria: "coordenacao" },
  { nome: "Cicero Luan", foto: "assets/integrantes/ciceroluan.jpeg", categoria: "coordenacao" },
  { nome: "Tios Galdino e Jordania", foto: "assets/integrantes/gaudinoejordania.jpeg", categoria: "apoio" },
  { nome: "Tios William e Vanessa", foto: "assets/integrantes/williamevanessa.jpeg", categoria: "tios-apoio" },
  { nome: "Tios Ribamar e Lourdinha", foto: "assets/integrantes/ribamarelourdinha.jpeg", categoria: "tios-apoio" },
  { nome: "Danilo Freitas", foto: "assets/integrantes/danilo.jpeg" },
  { nome: "João Pedro", foto: "assets/integrantes/joaopedro.jpeg" },
  { nome: "Maria Vitória", foto: "assets/integrantes/mariavitoria.jpeg" },
  { nome: "Luiz Felipe", foto: "assets/integrantes/luizfelipe.jpg" },
  { nome: "Camila", foto: "assets/integrantes/camila.jpeg" },
  { nome: "Gabriel Miranda", foto: "assets/integrantes/gabriel.jpeg" },
  { nome: "Gizelle Rocha", foto: "assets/integrantes/gizellerocha.jpeg" },
  { nome: "Ana Júlia", foto: "assets/integrantes/anajulia.jpeg" },  
  { nome: "Layna Miriely", foto: "assets/integrantes/laynasaraiva.jpeg" },
  { nome: "Maria Eduarda", foto: "assets/integrantes/mariaeduarda.jpeg" },
  { nome: "Luiza Veloso", foto: "assets/integrantes/luizaveloso.jpeg" },
  { nome: "Mirella Ferraz", foto: "assets/integrantes/mirella.jpeg" },
  { nome: "Suzane", foto: "assets/integrantes/suzane.jpeg" },
  { nome: "Wimbledon Lino", foto: "assets/integrantes/wimbledon.jpeg" }
];

const gruposIntegrantes = [
  { categoria: "coordenacao", titulo: "Jovens Coordenadores" },
  { categoria: "apoio", titulo: "Tios Apoio da Coordenação" },
  { categoria: "tios-apoio", titulo: "Tios Apoio" },
  { categoria: "membros", titulo: "Membros" }
];

const galeria = [
  { tipo: "foto", arquivo: "assets/galeria/foto1.jpeg" },
  { tipo: "foto", arquivo: "assets/galeria/foto2.jpeg" },
  { tipo: "video", arquivo: "assets/videos/video1.mp4" },
  { tipo: "foto", arquivo: "assets/galeria/foto3.jpeg" },
  { tipo: "foto", arquivo: "assets/galeria/foto4.jpeg" },
  { tipo: "foto", arquivo: "assets/galeria/foto5.jpeg" },
  { tipo: "video", arquivo: "assets/videos/video2.mp4" },
  { tipo: "foto", arquivo: "assets/galeria/foto6.jpeg" },
  { tipo: "foto", arquivo: "assets/galeria/foto7.jpeg" },
  { tipo: "foto", arquivo: "assets/galeria/foto8.jpeg" },
];

const loginScreen = document.querySelector("#loginScreen");
const siteContent = document.querySelector("#siteContent");
const loginForm = document.querySelector("#loginForm");
const passwordInput = document.querySelector("#passwordInput");
const togglePassword = document.querySelector("#togglePassword");
const loginError = document.querySelector("#loginError");
const teamGrid = document.querySelector("#teamGrid");
const carouselViewport = document.querySelector("#carouselViewport");
const carouselTrack = document.querySelector("#carouselTrack");
const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");
const currentSlideLabel = document.querySelector("#currentSlide");
const totalSlidesLabel = document.querySelector("#totalSlides");
const progressBar = document.querySelector("#carouselProgressBar");

let currentSlideIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function createMemberFallback(name) {
  const fallback = document.createElement("div");
  fallback.className = "media-placeholder";
  fallback.setAttribute("aria-label", `Foto de ${name} ainda não adicionada`);

  const initial = document.createElement("strong");
  initial.textContent = name.trim().charAt(0).toUpperCase() || "E";
  initial.style.fontSize = "3rem";
  fallback.appendChild(initial);

  return fallback;
}

function createMemberCard(member) {
  const card = document.createElement("article");
  card.className = "member-card reveal";

  const photoWrap = document.createElement("div");
  photoWrap.className = "member-photo-wrap";

  const photo = document.createElement("img");
  photo.className = "member-photo";
  photo.src = member.foto;
  photo.alt = `Foto de ${member.nome}`;
  photo.loading = "lazy";
  photo.draggable = false;

  photo.addEventListener("error", () => {
    photoWrap.replaceChildren(createMemberFallback(member.nome));
  }, { once: true });

  const name = document.createElement("h3");
  name.textContent = member.nome;

  photoWrap.appendChild(photo);
  card.append(photoWrap, name);
  return card;
}

function renderMembers() {
  teamGrid.textContent = "";

  gruposIntegrantes.forEach((group) => {
    const groupMembers = integrantes.filter((member) => {
      const memberCategory = member.categoria || "membros";
      return memberCategory === group.categoria;
    });

    if (groupMembers.length === 0) return;

    const section = document.createElement("section");
    section.className = `team-group team-group--${group.categoria}`;

    const title = document.createElement("h3");
    title.className = "team-group-title reveal";
    title.textContent = group.titulo;

    const grid = document.createElement("div");
    grid.className = "team-group-grid";

    groupMembers.forEach((member) => {
      grid.appendChild(createMemberCard(member));
    });

    section.append(title, grid);
    teamGrid.appendChild(section);
  });
}

function detectMediaType(item) {
  const extension = item.arquivo.split(".").pop().toLowerCase();
  const videoExtensions = ["mp4", "webm", "ogg", "mov"];
  return item.tipo === "video" || videoExtensions.includes(extension) ? "video" : "foto";
}

function showMediaFallback(slide, item, index) {
  const fallback = document.createElement("div");
  fallback.className = "media-placeholder";

  const text = document.createElement("div");
  const title = document.createElement("strong");
  const hint = document.createElement("span");

  title.textContent = `Momento ${String(index + 1).padStart(2, "0")}`;
  hint.textContent = `Adicione o arquivo “${item.arquivo}” para vê-lo aqui.`;
  text.append(title, hint);
  fallback.appendChild(text);
  slide.replaceChildren(fallback);
}

function renderGallery() {
  carouselTrack.textContent = "";

  if (galeria.length === 0) {
    const emptyItem = { arquivo: "assets/galeria/sua-foto.jpg" };
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    showMediaFallback(slide, emptyItem, 0);
    carouselTrack.appendChild(slide);
    return;
  }

  galeria.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-label", `${index + 1} de ${galeria.length}`);

    const mediaType = detectMediaType(item);
    let media;

    if (mediaType === "video") {
      media = document.createElement("video");
      media.controls = true;
      media.preload = "metadata";
      media.playsInline = true;
      media.setAttribute("controlsList", "nodownload");
      media.setAttribute("disablePictureInPicture", "");
      media.setAttribute("aria-label", `Vídeo ${index + 1} do encontro`);
    } else {
      media = document.createElement("img");
      media.alt = `Momento ${index + 1} do encontro`;
      media.loading = index === 0 ? "eager" : "lazy";
      media.draggable = false;
    }

    media.src = item.arquivo;
    media.addEventListener("error", () => showMediaFallback(slide, item, index), { once: true });
    slide.appendChild(media);
    carouselTrack.appendChild(slide);
  });
}

function formatSlideNumber(number) {
  return String(number).padStart(2, "0");
}

function updateCarousel() {
  const slideCount = Math.max(galeria.length, 1);
  carouselTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  currentSlideLabel.textContent = formatSlideNumber(currentSlideIndex + 1);
  totalSlidesLabel.textContent = formatSlideNumber(slideCount);
  progressBar.style.width = `${((currentSlideIndex + 1) / slideCount) * 100}%`;

  carouselTrack.querySelectorAll("video").forEach((video) => {
    const videoSlide = video.closest(".carousel-slide");
    const activeSlide = carouselTrack.children[currentSlideIndex];
    if (videoSlide !== activeSlide) video.pause();
  });
}

function goToNextSlide() {
  const slideCount = Math.max(galeria.length, 1);
  currentSlideIndex = (currentSlideIndex + 1) % slideCount;
  updateCarousel();
}

function goToPreviousSlide() {
  const slideCount = Math.max(galeria.length, 1);
  currentSlideIndex = (currentSlideIndex - 1 + slideCount) % slideCount;
  updateCarousel();
}

function startRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function handleLogin(event) {
  event.preventDefault();

  if (passwordInput.value === SENHA_CORRETA) {
    loginError.textContent = "";
    passwordInput.classList.remove("has-error");
    loginScreen.hidden = true;
    siteContent.hidden = false;
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    startRevealAnimations();
    return;
  }

  loginError.textContent = "Senha incorreta";
  passwordInput.classList.add("has-error");
  loginError.classList.remove("shake");
  void loginError.offsetWidth;
  loginError.classList.add("shake");
  passwordInput.select();
}

loginForm.addEventListener("submit", handleLogin);

passwordInput.addEventListener("input", () => {
  loginError.textContent = "";
  passwordInput.classList.remove("has-error");
});

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.setAttribute("aria-label", isHidden ? "Ocultar senha" : "Mostrar senha");
  passwordInput.focus();
});

previousButton.addEventListener("click", goToPreviousSlide);

nextButton.addEventListener("click", goToNextSlide);

carouselViewport.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

carouselViewport.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].clientX;
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) < 50) return;
  if (distance < 0) goToNextSlide();
  if (distance > 0) goToPreviousSlide();
}, { passive: true });

document.addEventListener("keydown", (event) => {
  if (siteContent.hidden) return;
  if (event.key === "ArrowLeft") goToPreviousSlide();
  if (event.key === "ArrowRight") goToNextSlide();
});

document.addEventListener("contextmenu", (event) => event.preventDefault());

document.addEventListener("dragstart", (event) => {
  if (event.target instanceof HTMLImageElement) event.preventDefault();
});

renderMembers();
renderGallery();
updateCarousel();
passwordInput.focus();
