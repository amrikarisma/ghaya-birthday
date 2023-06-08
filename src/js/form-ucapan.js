import Swal from 'sweetalert2'

let formUcapan = document.getElementById("form_ucapan");
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
            console.log("Post successfully created!")
            Swal.fire({
                title: 'Terima kasih ucapan & kadonya. Ghaya Senang...',
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


