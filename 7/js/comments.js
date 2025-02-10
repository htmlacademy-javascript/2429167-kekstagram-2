const COMMENTS_TO_FETCH = 5;
let renderingCommentsCount = 0;
const userModalElement = document.querySelector('.big-picture');
const userModalSocialComments = userModalElement.querySelector('.social__comments');
const socialComment = userModalSocialComments.querySelector('.social__comment');
const btnCommentLoader = userModalElement.querySelector('.comments-loader');

export const resetComments = () => {
  renderingCommentsCount = 0;
};

const createComment = (({avatar, name, message}) => {
  const cloneSocialComment = socialComment.cloneNode(true);
  cloneSocialComment.querySelector('.social__picture').src = avatar;
  cloneSocialComment.querySelector('.social__picture').alt = name;
  cloneSocialComment.querySelector('.social__text').textContent = message;
  return cloneSocialComment;
});

export const renderComment = (comments) => {
  const commentFragment = document.createDocumentFragment();
  renderingCommentsCount += COMMENTS_TO_FETCH;
  userModalSocialComments.innerHTML = '';

  if (renderingCommentsCount >= comments.length) {
    btnCommentLoader.classList.add('hidden');
    renderingCommentsCount = comments.length;
  } else {
    btnCommentLoader.classList.remove('hidden');
  }

  comments.slice(0, renderingCommentsCount).forEach((item) => {
    const comment = createComment(item);
    commentFragment.appendChild(comment);
  });

  userModalElement.querySelector('.social__comment-shown-count').textContent = renderingCommentsCount;
  userModalElement.querySelector('.social__comment-total-count').textContent = comments.length;

  userModalSocialComments.appendChild(commentFragment);
};
