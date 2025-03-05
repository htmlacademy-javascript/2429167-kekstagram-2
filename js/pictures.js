const randomUserPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesList = document.querySelector('.pictures');

const clearPhoto = () => {
  picturesList.querySelectorAll('a.picture').forEach((item) => item.remove());
};

const renderPictures = (data) => {
  const randomUserPictureFragment = document.createDocumentFragment();
  clearPhoto();
  data.forEach(({url, description, likes, comments, id}) => {
    const pictureElement = randomUserPictureTemplate.cloneNode(true);
    pictureElement.dataset.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    randomUserPictureFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(randomUserPictureFragment);
};

export { renderPictures };
