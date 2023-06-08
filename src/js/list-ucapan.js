import * as bootstrap from 'bootstrap'

const showToastMessage = async () => {
    let htmlToast = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-ghaya-birthday.vercel.app/message", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            // Response
            let responseJson = JSON.parse(this.response);
            responseJson.forEach(item => {
                htmlToast += `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <svg class="bd-placeholder-img rounded me-2" width="20" height="20"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice"
                        focusable="false">
                        <rect width="100%" height="100%" fill="#007aff"></rect>
                    </svg>
                    <strong class="me-auto">${item.name}</strong>
                    <small class="text-muted">just now</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${item.message}
                </div>
            </div>`
            });

            document.querySelector('#toastPlacement').innerHTML = htmlToast;
            const toastElList = document.querySelectorAll('.toast')

            const toastList = [...toastElList].map(async (toastEl, i) => {
                let toastItem = new bootstrap.Toast(toastEl);
                setTimeout(() => {
                    toastItem.show();
                    if (toastElList.length == i + 1) {
                        setTimeout(() => {
                            showToastMessage();
                        }, 14000);
                    }
                }, i * 10000);


            })

        }
    };
    xhr.send();
}

export default showToastMessage;