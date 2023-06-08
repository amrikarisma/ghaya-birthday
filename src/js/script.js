// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import Swal from 'sweetalert2'

import audioBirthday from '../assets/song.mp3'

var audio = document.createElement("audio");
document.querySelector('.music').appendChild(audio);

//
audio.autoplay = true;
audio.loop = true;
audio.preload = true;
audio.id = 'myaudio';
audio.src = audioBirthday;


document.addEventListener('click', function (event) {
    let promise = audio.play();

    if (promise !== undefined) {
        promise.then(_ => {
            console.log('OK')
            // Autoplay started!
        }).catch(error => {
            console.log('Fail')
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
});




// Set the date we're counting down to
var countDownDate = new Date("Sept 03, 2023 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    // document.getElementById("time").innerHTML = "<div class='container'><div class='days block'>" + days + "<br>Days</div>" + "<div class='hours block'>" + hours + "<br>Hours</div>" + "<div class='minutes block'>" + minutes + "<br>Minutes</div>" + "<div class='seconds block'>" + seconds + "<br>Seconds</div></div>";

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("time").innerHTML = "Bless the married couple for happy life!";
    }
}, 1000);



const balloonContainer = document.getElementById("balloon-container");

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = random(5) + 5;
    return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
    for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer.append(balloon);
    }
}

function removeBalloons() {
    balloonContainer.style.opacity = 0;
    setTimeout(() => {
        balloonContainer.remove()
    }, 500)
}

window.addEventListener("load", () => {
    createBalloons(30)
});

// window.addEventListener("click", () => {
//     removeBalloons();
// });

Swal.fire({
    title: 'Selamat Datang di Web Ghaya Birthday!',
    confirmButtonText: 'Lanjutkan',
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url("https://sweetalert2.github.io/images/trees.png)',
    backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
  `
})