const registerBtn = document.getElementById('submit');
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const responseMessageDiv = document.getElementById('response-message')

registerBtn.addEventListener('click', e => {

    const data = {username: usernameInput.value, password: passwordInput.value}

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        if (data.response == 'success') {
            console.log('success')
            window.location.href = "/"
        } else if (data.response == 'userExists') {
            console.log('user exits')
            responseMessageDiv.innerHTML = 'Selline kasutajanimi on juba olemas';
        }
        console.log(data);
    })
    console.log('123')
})
