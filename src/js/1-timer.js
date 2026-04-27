import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            startBtn.setAttribute('disabled', 'disabled');
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
        }
        else {
            datatimePicker.removeAttribute('disabled');
            startBtn.removeAttribute('disabled');
        }
    },
};


function formatNumberWithPadTwo(value) {
    return String(value).padStart(2, '0');
}

const datatimePicker = document.querySelector('#datetime-picker');

const remainingTimes = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

function updateRemainingElements(timeElement, remainingTime) {
    const { days, hours, minutes, seconds } = remainingTime;

    timeElement.days.textContent = formatNumberWithPadTwo(days);
    timeElement.hours.textContent = formatNumberWithPadTwo(hours);
    timeElement.minutes.textContent = formatNumberWithPadTwo(minutes);
    timeElement.seconds.textContent = formatNumberWithPadTwo(seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', startTimer);

function startTimer() {
    toggleControls(true);

    const selectedDate = dateTimePicker.selectedDates[0];
    runCountdown(selectedDate);
}

function runCountdown(targetDate) {
    const intervalId = setInterval(() => {
        const currentTime = Date.now();

        if (currentTime >= targetDate) {
            stopTimer(intervalId);
            return;
        }

        const timeLeft = convertMs(targetDate - currentTime);
        updateRemainingElements(remainingTimes, timeLeft);

    }, 1000);
}

function stopTimer(id) {
    clearInterval(id);
    toggleControls(false);

    iziToast.info({
        title: 'Please, choose a date and click on start 🔻',
        position: 'topCenter',
    });
}

function toggleControls(isRunning) {
    if (isRunning) {
        datatimePicker.setAttribute('disabled', 'disabled');
        startBtn.setAttribute('disabled', 'disabled');
    } else {
        datatimePicker.removeAttribute('disabled');
    }
}

const dateTimePicker = flatpickr('#datetime-picker', options);