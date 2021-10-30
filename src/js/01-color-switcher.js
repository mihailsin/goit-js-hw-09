const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let intervalId;
startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

function onStart(e) {
  e.currentTarget.setAttribute('disabled', 'true');
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStop(e) {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled');
}
