const CURTAINS_DATA = [
  { id: 1, image: "/assets/curtains/1.jpeg", tag: "Embroidered Pelmet" },
  { id: 2, image: "/assets/curtains/2.jpeg", tag: "Chic Blind" },
  { id: 3, image: "/assets/curtains/3.jpeg", tag: "Pelmet" },
  { id: 4, image: "/assets/curtains/4.jpeg", tag: "Custom Curtain" },
  { id: 5, image: "/assets/curtains/5.jpeg", tag: "Embroidered Pelmet" },
  { id: 6, image: "/assets/curtains/6.jpeg", tag: "Premium Drapery" },
  { id: 7, image: "/assets/curtains/7.jpeg", tag: "Chic Blind" },
  { id: 8, image: "/assets/curtains/8.jpeg", tag: "Custom Curtain" },
  { id: 9, image: "/assets/curtains/9.jpeg", tag: "Pelmet" },
  { id: 10, image: "/assets/curtains/10.jpeg", tag: "Embroidered Pelmet" },
  { id: 11, image: "/assets/curtains/11.jpeg", tag: "Window Drapery" },
  { id: 12, image: "/assets/curtains/12.jpeg", tag: "Chic Blind" },
  { id: 13, image: "/assets/curtains/13.jpeg", tag: "Pelmet" },
  { id: 14, image: "/assets/curtains/14.jpeg", tag: "Premium Drapery" },
  { id: 15, image: "/assets/curtains/15.jpeg", tag: "Embroidered Pelmet" },
  { id: 16, image: "/assets/curtains/16.jpeg", tag: "Chic Blind" },
  { id: 17, image: "/assets/curtains/17.jpeg", tag: "Custom Curtain" },
  { id: 18, image: "/assets/curtains/18.jpeg", tag: "Premium Drapery" },
  { id: 19, image: "/assets/curtains/19.jpeg", tag: "Embroidered Pelmet" },
  { id: 20, image: "/assets/curtains/20.jpeg", tag: "Chic Blind" },
  { id: 21, image: "/assets/curtains/21.jpeg", tag: "Custom Curtain" },
  { id: 22, image: "/assets/curtains/22.jpeg", tag: "Premium Drapery" },
  { id: 23, image: "/assets/curtains/23.jpeg", tag: "Embroidered Pelmet" }
];

let currentLightboxIdx = 0;

const galleryGrid = document.getElementById("curtainGalleryGrid");
const lightboxModal = document.getElementById("lightboxModal");
const lightboxStage = document.getElementById("lightboxStage");
const lightboxTargetImg = document.getElementById("lightboxTargetImg");
const lightboxCaptionTag = document.getElementById("lightboxCaptionTag");
const lightboxCaptionTitle = document.getElementById("lightboxCaptionTitle");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const siteHeader = document.getElementById("siteHeader");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileDrawer = document.getElementById("mobileDrawer");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  },
  { passive: true }
);

function setDrawerState(open) {
  if (open) {
    mobileDrawer.classList.add("open");
    mobileMenuBtn.classList.add("active");
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("scroll-locked");
  } else {
    mobileDrawer.classList.remove("open");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("scroll-locked");
  }
}

mobileMenuBtn.addEventListener("click", () => {
  const isOpen = mobileDrawer.classList.contains("open");
  setDrawerState(!isOpen);
});

document.querySelectorAll(".mobile-drawer-link").forEach((link) => {
  link.addEventListener("click", () => {
    setDrawerState(false);
  });
});

function renderGallery() {
  galleryGrid.innerHTML = "";

  CURTAINS_DATA.forEach((item, index) => {
    const card = document.createElement("div");

    card.className = "curtain-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${item.tag} ${item.id}`);

    card.innerHTML = `
      <div class="card-media-wrapper">
        <img
          src="${item.image}"
          alt="${item.tag}"
          class="card-media-img"
          loading="lazy"
        >
      </div>

      <div class="card-meta-bottom">
        <span class="card-tag-badge">${item.tag}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      openLightbox(index);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    galleryGrid.appendChild(card);
  });
}

function openLightbox(index) {
  currentLightboxIdx = index;

  updateLightboxContent();

  lightboxModal.classList.add("active");
  document.body.classList.add("scroll-locked");

  window.addEventListener("keydown", handleLightboxKeydown);
}

function closeLightbox() {
  lightboxModal.classList.remove("active");

  if (!mobileDrawer.classList.contains("open")) {
    document.body.classList.remove("scroll-locked");
  }

  window.removeEventListener("keydown", handleLightboxKeydown);
}

function updateLightboxContent() {
  const item = CURTAINS_DATA[currentLightboxIdx];

  lightboxTargetImg.src = item.image;
  lightboxTargetImg.alt = item.tag;

  lightboxCaptionTag.textContent = item.tag;
  lightboxCaptionTitle.textContent = `Curtain ${item.id}`;

  lightboxCounter.textContent = `${currentLightboxIdx + 1} of ${CURTAINS_DATA.length}`;
}

function nextImage() {
  currentLightboxIdx = (currentLightboxIdx + 1) % CURTAINS_DATA.length;

  updateLightboxContent();
}

function prevImage() {
  currentLightboxIdx =
    (currentLightboxIdx - 1 + CURTAINS_DATA.length) % CURTAINS_DATA.length;

  updateLightboxContent();
}

function handleLightboxKeydown(e) {
  if (e.key === "Escape") {
    closeLightbox();
  }

  if (e.key === "ArrowRight") {
    nextImage();
  }

  if (e.key === "ArrowLeft") {
    prevImage();
  }
}

lightboxClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  nextImage();
});

lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  prevImage();
});

lightboxModal.addEventListener("click", closeLightbox);

lightboxStage.addEventListener("click", (e) => {
  e.stopPropagation();
});

let touchStartX = 0;
let touchEndX = 0;

lightboxStage.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

lightboxStage.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 40) {
      nextImage();
    }

    if (touchEndX > touchStartX + 40) {
      prevImage();
    }
  },
  { passive: true }
);

renderGallery();
