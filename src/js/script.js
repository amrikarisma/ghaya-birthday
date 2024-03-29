import '../scss/styles.scss'
import Swal from 'sweetalert2'
import audioBirthday from '../assets/song.mp3'
import './form-ucapan';
import showToastMessage from './list-ucapan';

let name;
let welcomeMessage;

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const invitaitonTo = urlParams.get('to')
if (invitaitonTo) {
    localStorage.setItem('name', invitaitonTo);
}

var audio = document.createElement("audio");
document.querySelector('.music').appendChild(audio);

//
audio.autoplay = true;
audio.loop = true;
audio.preload = true;
audio.volume = 0.2;
audio.id = 'myaudio';
audio.src = audioBirthday;


document.addEventListener('click', function (event) {
    let promise = audio.play();

    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
});

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

async function createBalloons(num) {
    for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer.append(balloon);
        await new Promise(r => setTimeout(r, 2000));
    }
}

function removeBalloons() {
    balloonContainer.style.opacity = 0;
    setTimeout(() => {
        balloonContainer.remove()
    }, 500)
}

window.addEventListener("load", () => {
    name = localStorage.getItem("name");
    if (name) {
        document.querySelector('#name').value = name;
        welcomeMessage = `Hi ${name}, you are invited to Ghaya's birthday party`;
    } else {
        welcomeMessage = `We invite you to Ghaya's birthday party`;
    }

    createBalloons(15)
    Swal.fire({
        title: welcomeMessage,
        confirmButtonText: 'Open invitation',
        width: 600,
        padding: '3em 0',
        color: '#674ea7',
        background: '#fff url("https://sweetalert2.github.io/images/trees.png")',
        backdrop: `
    #f27474f7
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
  `
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            // showToastMessage()
        }
    })
});

function countdownTimer() {
    // Set the date we're counting down to
    var countDownDate = new Date("2023/09/03 15:30:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = days + " days " + hours + " hours "
            + minutes + " minutes " + seconds + " secounds ";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "";
        }
    }, 1000);
}


document.addEventListener("DOMContentLoaded", () => {
    countdownTimer();
    document.querySelector('body').style.visibility = 'visible';
});
