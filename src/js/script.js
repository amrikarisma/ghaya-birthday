import '../scss/styles.scss'
import Swal from 'sweetalert2'
import audioBirthday from '../assets/song.mp3'
import './form-ucapan';
import showToastMessage from './list-ucapan';

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
            console.log('OK')
            // Autoplay started!
        }).catch(error => {
            console.log('Fail')
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
    createBalloons(30)
    Swal.fire({
        title: 'Welcome to Ghaya\'s Birthday Party Invitation!',
        confirmButtonText: 'Enter',
        width: 600,
        padding: '3em',
        color: '#674ea7',
        background: '#fff url("https://sweetalert2.github.io/images/trees.png")',
        backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
  `
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            showToastMessage()
        }
    })
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('body').style.visibility = 'visible';

});
