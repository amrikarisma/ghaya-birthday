import Swal from 'sweetalert2'

const chatbox = document.getElementById("chatbox");
getMessage();

setInterval(() => {
    if (chatbox.scrollTop === chatbox.scrollHeight) {
        getMessage();
    }
}, 15000);

chatbox.onscroll = (event) => {
    console.log(chatbox.scrollTop, chatbox.scrollHeight)
    if ((chatbox.scrollTop + 200) == chatbox.scrollHeight) {
        getMessage();
    }
}

function getMessage() {

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-ghaya-birthday.vercel.app/message", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let responseJson = JSON.parse(this.response);
            let html = "";
            responseJson.forEach(item => {
                html += `<div class="item-chat">
                            <div class="author"><span class="badge bg-primary">${item.name}</span></div>
                            <p>${item.message}</p>
                        </div>`;
            });
            chatbox.innerHTML = html;
            chatbox.scrollTop = chatbox.scrollHeight;

        }
    };
    xhr.send();
}


const formUcapan = document.getElementById("form_ucapan");
formUcapan.onsubmit = function (event) {
    event.preventDefault();
    let formData = {
        name: formUcapan.querySelector('[name=name]').value,
        message: formUcapan.querySelector('[name=message]').value,
        gift: 0
    }

    let post = JSON.stringify(formData)
    const url = "https://api-ghaya-birthday.vercel.app/message/send"
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(post);
    xhr.onload = function () {
        if (xhr.status === 200) {
            formUcapan.reset()
            getMessage()
            Swal.fire({
                title: 'Thanks for the greetings and the gift. Ghaya is happy...🥰',
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
            })
        }
    }


};


