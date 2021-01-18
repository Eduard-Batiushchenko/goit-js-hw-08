import gallery from '../gallery-items.js';

const galleryItemsRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const lightBoxContentRef = lightBoxRef.querySelector('.lightbox__image');
const overlayRef = lightBoxRef.querySelector('.lightbox__overlay');
const lightBoxBtn = lightBoxRef.querySelector('.lightbox__button');

galleryItemsRef.addEventListener('click', openModal);
lightBoxBtn.addEventListener('click', closeModal);
overlayRef.addEventListener('click', closeModal);

const makeGalleryMarkup = gallery.map((item, index) => {
  const liRef = document.createElement('li');
  const aRef = document.createElement('a');
  const imgRef = document.createElement('img');

  aRef.href = item.original;
  imgRef.src = item.preview;
  imgRef.dataset.source = item.original;
  imgRef.dataset.index = index;
  imgRef.alt = item.description;

  aRef.classList.add('gallery__link');
  imgRef.classList.add('gallery__image');

  aRef.append(imgRef);
  liRef.append(aRef);
  galleryItemsRef.append(liRef);
  return liRef;
});

function openModal(event) {
  const target = event.target;
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    lightBoxRef.classList.add('is-open');
    lightBoxContentRef.dataset.index = target.dataset.index;
    lightBoxContentRef.src = target.dataset.source;
    lightBoxContentRef.alt = target.alt;
    window.addEventListener('keydown', onPressEsc);
    window.addEventListener('keydown', onPressArr);
  }
}

function closeModal() {
  if (overlayRef.target === overlayRef.currentTarget) {
    lightBoxRef.classList.remove('is-open');
    lightBoxContentRef.src = '';
    lightBoxContentRef.alt = '';
    window.removeEventListener('keydown', onPressArr);
    window.removeEventListener('keydown', onPressEsc);
  }
}

function onPressEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function modalImgSelector(index) {
  const nextImg = document.querySelector(`[data-index="${index}"]`);
  lightBoxContentRef.src = nextImg.dataset.source;
  lightBoxContentRef.alt = nextImg.alt;
  lightBoxContentRef.dataset.index = nextImg.dataset.index;
}

function onPressArr(event) {
  if (event.code === 'ArrowRight') {
    const nextIndex =
      Number(lightBoxContentRef.dataset.index) === makeGalleryMarkup.length - 1
        ? 0
        : Number(lightBoxContentRef.dataset.index) + 1;
    modalImgSelector(nextIndex);
  }
  if (event.code === 'ArrowLeft') {
    const prevIndex =
      Number(lightBoxContentRef.dataset.index) === 0
        ? makeGalleryMarkup.length - 1
        : Number(lightBoxContentRef.dataset.index) - 1;
    modalImgSelector(prevIndex);
  }
}
