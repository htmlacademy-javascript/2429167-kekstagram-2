import { isEscapeKey } from './util';

const ALERT_SHOW_TIME = 5000;

const removeMessage = (element) => element.remove();

const removeMessageEsc = (event, element) => {
  if (isEscapeKey(event)) {
    removeMessage(element);
  }
};

export const showDataAlert = () => {
  const dataAlert = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataAlertClone = dataAlert.cloneNode(true);

  document.body.appendChild(dataAlertClone);

  setTimeout(() => {
    document.body.removeChild(dataAlertClone);
  }, ALERT_SHOW_TIME);
};

export const showMessage = (tpl) => {
  const message = document.querySelector(`#${tpl}`).content.querySelector(`.${tpl}`);
  const messageClone = message.cloneNode(true);
  const messageButton = messageClone.querySelector('button');

  document.body.appendChild(messageClone);
  document.addEventListener('keydown', (evt) => removeMessageEsc(evt, messageClone));

  messageClone.addEventListener('click', (event) => {
    if (event.target === messageButton || event.target === messageClone) {
      removeMessage(messageClone);
    }
  });
};
