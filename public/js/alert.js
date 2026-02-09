/* eslint-disable */

// * alternate function for .remove() method
// const hideAlert = () => {
//   const el = document.querySelector('.alert');
//   if (el) el.parentElement.removeChild(el);
// };

const showAlert = (type, msg) => {
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(() => {
    const alert = document.querySelector('.alert');
    if (alert) {
      alert.remove();
    }
  }, 5000);
};

module.exports = showAlert;