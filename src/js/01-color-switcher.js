
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

let intervalId;

const startbtn = document.querySelector('.startbtn');
const stopbtn = document.querySelector('.stopbtn');

startbtn.addEventListener('click', function () {
    startbtn.disabled = true;
  intervalId = setInterval(function() {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopbtn.addEventListener('click', function() {
    clearInterval(intervalId);
    startbtn.disabled = false;
    document.body.style.backgroundColor = "";
    
});