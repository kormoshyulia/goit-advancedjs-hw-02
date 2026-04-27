import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const { delay, state } = event.currentTarget.elements;
  const delayValue = Number(delay.value);
  const stateValue = state.value;

  createPromise(delayValue, stateValue)
    .then(showSuccess)
    .catch(showError);

  delay.value = '';
  const radioButtons = event.currentTarget.querySelectorAll('input[name="state"]');
  radioButtons.forEach(radio => radio.checked = false);
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
}

function showSuccess(delay) {
  iziToast.success({
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight',
  });
}

function showError(delay) {
  iziToast.error({
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight',
  });
}