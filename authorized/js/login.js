document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('loginButton');
    button.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log('went here' + password && email.includes('@'));
    if (password == 'm294' && emailRegex.test(email)) {
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
        alert('please try the password m294 other passwords do not work or change your email to a correct email');
    }
    })
})