import { isEscapeKey } from './util.js';
import { postGenerator } from './data.js';
import { renderComment, resetComments } from './comments.js';

const userModalElement = document.querySelector('.big-picture');
const userModalElementPicture = userModalElement.querySelector('.big-picture__img img');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');
const pageBody = document.querySelector('body');
let pictureComments = [];
const btnCommentLoader = userModalElement.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal (evt) {
  const id = evt.currentTarget.dataset.id;
  const pictureData = postGenerator.find((item) => item.id === Number(id));
  pageBody.classList.add('modal-open');

  userModalElementPicture.src = pictureData.url;
  userModalElementPicture.alt = pictureData.description;
  userModalElement.querySelector('.likes-count').textContent = pictureData.likes;
  userModalElement.querySelector('.social__caption').textContent = pictureData.description;

  pictureComments = pictureData.comments;
  renderComment(pictureData.comments);

  userModalElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  resetComments();
  userModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  pageBody.classList.remove('modal-open');
}

export const renderBigPhoto = () => {
  const userModalOpenElement = document.querySelectorAll('.picture');
  userModalOpenElement.forEach((item) => item.addEventListener('click', openUserModal));
};

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

btnCommentLoader.addEventListener('click', () => renderComment(pictureComments));
