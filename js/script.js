const galleryItems = window.galleryItems ?? [
  {
    preview:
      "https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg",
    description: "Tulips",
  },
  {
    preview:
      "https://img.freepik.com/premium-photo/mango-fruit-isolated-white-background_489827-1162.jpg?semt=ais_incoming&w=740&q=80",
    original:
      "https://img.freepik.com/premium-photo/mango-fruit-isolated-white-background_489827-1162.jpg?semt=ais_incoming&w=740&q=80",
    description: "Rose",
  },
];

const galleryList = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = lightbox.querySelector(".lightbox__image");
const closeBtn = lightbox.querySelector('[data-action="close-lightbox"]');

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) => `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      loading="lazy"
    />
  </a>
</li>`
  )
  .join("");

galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

galleryList.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();

  const img = e.target;
  if (img.nodeName !== "IMG") return;

  openLightbox(img.dataset.source, img.alt);
}

closeBtn.addEventListener("click", closeLightbox);

function openLightbox(src, alt) {
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");

  lightboxImage.src = src;
  lightboxImage.alt = alt ?? "";

  document.documentElement.style.overflow = "hidden";
  closeBtn.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");

  lightboxImage.src = "";
  lightboxImage.alt = "";

  document.documentElement.style.overflow = "";
}
