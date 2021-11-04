import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const MESSAGE = 'Please choose a date in the future';
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');
const datePicker = document.querySelector('#datetime-picker');
disableBtn();
startBtn.addEventListener('click', () => {
  timer.start();
});
function enableDatePicker() {
  datePicker.removeAttribute('disabled');
}
function disableDatePicker() {
  datePicker.setAttribute('disabled', 'true');
}
function enableBtn() {
  startBtn.removeAttribute('disabled');
}
function disableBtn() {
  startBtn.setAttribute('disabled', 'true');
}
function resetTimer() {
  daysRef.textContent = '00';
  hoursRef.textContent = '00';
  secondsRef.textContent = '00';
  minutesRef.textContent = '00';
}
let dateX;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      disableBtn();
      Notiflix.Notify.failure(MESSAGE, {
        position: 'left-top',
        width: '50vw',
        clickToClose: true,
      });
    } else {
      enableBtn();
      dateX = selectedDates[0];
    }
  },
};
console.log(new Date());
const fp = flatpickr('#datetime-picker', options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const timer = {
  intervalId: null,
  start() {
    disableBtn();
    disableDatePicker();
    const startTime = dateX.getTime();
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      daysRef.textContent = `${days}`;
      hoursRef.textContent = `${hours}`;
      minutesRef.textContent = `${minutes}`;
      secondsRef.textContent = `${seconds}`;
      if (Number(secondsRef.textContent) < 20) {
        secondsRef.classList.add('danger');
      }
      if (deltaTime <= 0) {
        this.stop();
        resetTimer();
        disableBtn();
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    enableDatePicker();
    secondsRef.classList.remove('danger');
    Notiflix.Notify.failure('TIME IS OUT!', {
      position: 'center-center',
      width: '100vw',
      clickToClose: true,
      fontSize: '4em',
    });
  },
};
