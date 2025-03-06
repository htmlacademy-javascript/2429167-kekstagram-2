import { renderPictures } from './pictures';
import { renderBigPhoto } from './popup';
import { debounce } from './util';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const MAX_PICTURE_COUNT = 10;

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORT_FUNC = {
  getRandom: () => 0.5 - Math.random(),
  getDiscussed: (a, b) => b.comments.length - a.comments.length,
};

let currentFilter = FILTER.default;
let pictures = [];
const imageFilters = document.querySelector('.img-filters');

const renderPhotos = (images) => {
  renderPictures(images);
  renderBigPhoto(images);
};

const debounceRender = debounce(renderPhotos);

function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }
  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

function applyFilter() {
  let filteredPictures = [];
  if (currentFilter === FILTER.default) {
    filteredPictures = pictures;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = pictures.toSorted(SORT_FUNC.getRandom).slice(0, MAX_PICTURE_COUNT);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = pictures.toSorted(SORT_FUNC.getDiscussed);
  }
  debounceRender(filteredPictures);
}

function configFilter(data) {
  imageFilters.classList.remove('img-filters--inactive');
  imageFilters.addEventListener('click', onFilterChange);
  pictures = data;
}

export { configFilter };
