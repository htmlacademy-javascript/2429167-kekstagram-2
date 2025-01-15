import { postGenerator } from './data.js';

const randomUserPicture = postGenerator;

const randomUserPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const randomUserPictureFragment = document.createDocumentFragment();

const picturesList = document.querySelector('.pictures');

randomUserPicture.forEach(({url, description, likes, comments}) => {
  const pictureElement = randomUserPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length - 1;
  randomUserPictureFragment.appendChild(pictureElement);
});

picturesList.appendChild(randomUserPictureFragment);
