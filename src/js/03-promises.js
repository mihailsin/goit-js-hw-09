import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
// const button = document.querySelector('button[type="submit"]');
form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function onSubmit(e) {
  e.preventDefault();
  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = form.elements.amount.value;
  let position = 1;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          width: '40vw',
        });
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          width: '40vw',
        });
      });
    delay += step;
    position += 1;
  }
}
