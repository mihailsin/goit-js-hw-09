const form = document.querySelector('.form');
console.dir(form);
const delayField = form.elements.delay;
const stepField = form.elements.delay;
const amountField = form.elements.amount;

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

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

// const promise = new Promise((resolve, reject) => {
//   const isTrue = Math.random() > 0.5;
//   setTimeout(() => {
//     if (isTrue) {
//       resolve(5);
//     } else {
//       reject('Error!');
//     }
//   }, 2000);
// });
// promise
//   .then(value => {
//     console.log(value);
//     return value * 2;
//   })
//   .then(value => {
//     console.log(value);
//     return value * 2;
//   })
//   .then(value => {
//     console.log(value);
//     return console.log(value * 2);
//   })
//   .catch(error => {
//     console.log(error);
//   })
//   .finally(() => console.log('Youll see this log anyway'));
