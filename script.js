/* ==================================================================
   CONFIGURAÇÕES FÁCEIS DO SITE
   Esta é a parte que você provavelmente mais vai editar.
   ================================================================== */

/*
  ONDE ALTERAR A SENHA
  Troque apenas o texto entre aspas. Exemplo: const SENHA_CORRETA = "novaSenha";

  IMPORTANTE: como este site é totalmente estático, a senha serve como uma
  barreira simples e não como proteção de segurança real. Uma pessoa com
  conhecimento técnico pode encontrar a senha no código-fonte.
*/
const SENHA_CORRETA = "ejc16";

/*
  ONDE ALTERAR NOMES, TROCAR FOTOS E ADICIONAR NOVOS MEMBROS

  1. Coloque a foto dentro da pasta assets/integrantes.
  2. Copie um bloco completo { nome: ..., foto: ... }.
  3. Separe cada bloco com uma vírgula.
  4. O nome do arquivo precisa ser exatamente igual ao que está na pasta.

  Os itens abaixo são exemplos. Você pode trocar todos eles.
*/
const integrantes = [
  { nome: "Ana Clara", foto: "assets/integrantes/anaclra.jpg", categoria: "coordenacao" },
  { nome: "Cicero Luan", foto: "assets/integrantes/ciceroluan.jpg", categoria: "coordenacao" },
  { nome: "Tio Galdino e Jordania", foto: "assets/integrantes/galdinoejordania.jpg", categoria: "apoio" },
  { nome: "Tio William e Vanessa", foto: "assets/integrantes/williamevanessa.jpg", categoria: "tios-apoio" },
  { nome: "Tio Ribamar e Lourdinha", foto: "assets/integrantes/ribamarelourdinha.jpg", categoria: "tios-apoio" },
  { nome: "Danilo Freitas", foto: "assets/integrantes/danilo.jpg" },
  { nome: "João Pedro", foto: "assets/integrantes/joaopedro.jpg" },
  { nome: "Maria Vitória", foto: "assets/integrantes/mariavitoria.jpg" },
  { nome: "Luiz Felipe", foto: "assets/integrantes/luizfelipe.jpg" },
  { nome: "Camila", foto: "assets/integrantes/camila.jpg" },
  { nome: "Gabriel", foto: "assets/integrantes/gabriel.jpg" },
  { nome: "Gizelle Rocha", foto: "assets/integrantes/gizellerocha.jpg" },
  { nome: "Ana Júlia", foto: "assets/integrantes/anajulia.jpg" },
  { nome: "Layna Saraiva", foto: "assets/integrantes/laynasaraiva.jpg" },
  { nome: "Maria Eduarda", foto: "assets/integrantes/mariaeduarda.jpg" },
  { nome: "Luiza Veloso", foto: "assets/integrantes/luizaveloso.jpg" },
  { nome: "Maria Eduarda", foto: "assets/integrantes/mariaeduarda.jpg" },
  { nome: "Mirella", foto: "assets/integrantes/mirella.jpg" },
  { nome: "Suzane", foto: "assets/integrantes/suzane.jpg" },
  { nome: "Wimbledon Lino", foto: "assets/integrantes/wimbledon.jpg" }
];

/*
  GRUPOS EXIBIDOS NA SEÇÃO DA EQUIPE
  Quem não tiver uma "categoria" informada será colocado automaticamente
  no grupo "Membros". Assim, os demais integrantes não precisam ser alterados.
*/
const gruposIntegrantes = [
  { categoria: "coordenacao", titulo: "Jovens Coordenadores" },
  { categoria: "apoio", titulo: "Tios Apoio da Coordenação" },
  { categoria: "tios-apoio", titulo: "Tios Apoio" },
  { categoria: "membros", titulo: "Membros" }
];

/*
  ONDE ADICIONAR NOVAS FOTOS E NOVOS VÍDEOS

  FOTO: coloque em assets/galeria e use tipo: "foto".
  VÍDEO: coloque em assets/videos e use tipo: "video".

  Para adicionar um item, copie uma linha, cole antes do ]; e ajuste o caminho.
  O site também confere a extensão do arquivo para identificar foto ou vídeo.
*/
const galeria = [
  { tipo: "foto", arquivo: "assets/galeria/teste1.jpg" },
  { tipo: "foto", arquivo: "assets/galeria/teste2.jpg" }
];

/* ==================================================================
   ELEMENTOS DA PÁGINA
   Daqui para baixo não é preciso alterar para trocar o conteúdo do site.
   ================================================================== */
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

/* Mostra uma inicial bonita quando uma foto ainda não foi adicionada à pasta. */
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

/* Cria um card individual. Esta função é reutilizada em todos os grupos. */
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

  /* Se o arquivo não existir, substitui a imagem quebrada por uma inicial. */
  photo.addEventListener("error", () => {
    photoWrap.replaceChildren(createMemberFallback(member.nome));
  }, { once: true });

  const name = document.createElement("h3");
  name.textContent = member.nome;

  photoWrap.appendChild(photo);
  card.append(photoWrap, name);
  return card;
}

/* Cria os grupos e distribui os integrantes automaticamente. */
function renderMembers() {
  teamGrid.textContent = "";

  gruposIntegrantes.forEach((group) => {
    const groupMembers = integrantes.filter((member) => {
      const memberCategory = member.categoria || "membros";
      return memberCategory === group.categoria;
    });

    /* Não mostra um grupo vazio. */
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

/* Descobre o tipo também pela extensão, mesmo se "tipo" tiver sido esquecido. */
function detectMediaType(item) {
  const extension = item.arquivo.split(".").pop().toLowerCase();
  const videoExtensions = ["mp4", "webm", "ogg", "mov"];
  return item.tipo === "video" || videoExtensions.includes(extension) ? "video" : "foto";
}

/* Cria um aviso agradável caso um arquivo da galeria ainda não exista. */
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

/* Cria as fotos e os vídeos do carrossel usando a lista "galeria". */
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

/* Formata 1 como 01 para deixar o indicador visualmente mais elegante. */
function formatSlideNumber(number) {
  return String(number).padStart(2, "0");
}

/* Move o carrossel e atualiza os números e a barra de progresso. */
function updateCarousel() {
  const slideCount = Math.max(galeria.length, 1);
  carouselTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  currentSlideLabel.textContent = formatSlideNumber(currentSlideIndex + 1);
  totalSlidesLabel.textContent = formatSlideNumber(slideCount);
  progressBar.style.width = `${((currentSlideIndex + 1) / slideCount) * 100}%`;

  /* Pausa vídeos que ficaram fora da tela ao trocar de item. */
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

/* Observa a rolagem e ativa o efeito de aparecer suavemente. */
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

/* Libera o site somente quando a senha digitada estiver correta. */
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
  /* Força o navegador a reiniciar a pequena animação de erro. */
  void loginError.offsetWidth;
  loginError.classList.add("shake");
  passwordInput.select();
}

/* Eventos da tela de senha. */
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

/* Eventos dos botões do carrossel. */
previousButton.addEventListener("click", goToPreviousSlide);
nextButton.addEventListener("click", goToNextSlide);

/*
  Movimento de deslizar no celular (swipe).
  Um movimento mínimo de 50 pixels evita trocas acidentais.
*/
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

/* Permite usar as setas do teclado em computadores. */
document.addEventListener("keydown", (event) => {
  if (siteContent.hidden) return;
  if (event.key === "ArrowLeft") goToPreviousSlide();
  if (event.key === "ArrowRight") goToNextSlide();
});

/*
  MEDIDAS PARA DIFICULTAR CÓPIAS
  Sites não conseguem impedir capturas de tela. Estas medidas apenas bloqueiam
  ações comuns do navegador, conforme solicitado no briefing.
*/
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("dragstart", (event) => {
  if (event.target instanceof HTMLImageElement) event.preventDefault();
});

/* Monta o conteúdo assim que o arquivo é carregado. */
renderMembers();
renderGallery();
updateCarousel();
passwordInput.focus();
