document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('loginButton');
    button.addEventListener('click', () => {
    let email = document.getElementById('email');
    let password = document.getElementById('password').value;
    console.log('went here' + password);
    if (password == 'm294') {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        if (email != '' && password != '') {
            const apiUrl = 'http://localhost:3000/auth/jwt/sign';
            const data = {
                email: email,
                password: password
            };

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert('you are logged in now');
                console.log(data.token);
                localStorage.setItem("bearer", data.token);
                window.location.href = 'get.html';
                console.log(data);
            })
            .catch(error => {
                alert('something went while getting the webtoken please try again')
                console.error(error);
            });
        }
    } else {
        alert('please try the password m294 other passwords do not work');
    }
    })
})