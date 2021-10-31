import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const MESSAGE = 'Please choose a date in the future';
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', 'true');
startBtn.addEventListener('click', () => {
  timer.start();
});

let dateX;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      startBtn.setAttribute('disabled', 'true');
      alert(MESSAGE);
    } else {
      startBtn.removeAttribute('disabled');
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
  isActive: false,
  start() {
    const startTime = dateX.getTime();
    this.intervalId = setInterval(() => {
      this.isActive = true;
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      daysRef.textContent = `${days}`;
      hoursRef.textContent = `${hours}`;
      minutesRef.textContent = `${minutes}`;
      secondsRef.textContent = `${seconds}`;
      if (deltaTime <= 0) {
        this.stop();
        startBtn.setAttribute('disabled', 'true');
        daysRef.textContent = '00';
        hoursRef.textContent = '00';
        secondsRef.textContent = '00';
        minutesRef.textContent = '00';
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    alert('time is out!');
  },
};
