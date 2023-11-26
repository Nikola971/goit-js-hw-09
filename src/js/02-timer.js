import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const initializeFlatpickr = () => {
  return new Promise((resolve) => {
    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const selectedDate = selectedDates[0];

        if (selectedDate < new Date()) {
          Notiflix.Notify.failure("Будь ласка,виберіть дату в майбутньому");
          document.querySelector('[data-start]').disabled = true;
          resolve(false);
        } else {
          document.querySelector('[data-start]').disabled = false;
          resolve(selectedDate);
        }
      },
    };

    flatpickr("#datetime-picker", options);
  });
};

const startTimer = (targetDate) => {
  return new Promise((resolve) => {
    let countdown = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = targetDate - currentDate;

      if (timeDifference <= 0) {
        clearInterval(countdown);
        updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        Notiflix.Notify.success("Timer has ended!");
        resolve();
      } else {
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        updateTimerUI({ days, hours, minutes, seconds });
      }
    }, 1000);
  });
};

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = (value) => {
  return value.toString().padStart(2, '0');
};

const updateTimerUI = ({ days, hours, minutes, seconds }) => {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
};

document.querySelector('[data-start]').addEventListener('click', async () => {
  const selectedDate = await initializeFlatpickr();
  
  if (!selectedDate) {
    Notiflix.Notify.warning("Please choose a valid date");
    return;
  }

  await startTimer(selectedDate);
});
