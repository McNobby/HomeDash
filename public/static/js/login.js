if (localStorage.getItem('token')) {
    window.location.href = '/all.html';
}

document.querySelector('#login')
.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    let token = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    token = await token.json();

    if (token.success) {
        localStorage.setItem('token', token.token);
        window.location.href = '/all.html';
    }else{
        alert('Wrong username or password');
    }

})