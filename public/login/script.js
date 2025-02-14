const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    let formData = new FormData(form);
    let data = Object.fromEntries(formData);
    let jsonData = JSON.stringify(data);

    event.preventDefault();
    fetch('http://localhost:4080/user/login', {
        method: 'POST',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
        body: jsonData,
    }).then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))


}

const oauth = document.getElementById("oauth");

oauth.addEventListener('click',(event)=> {
    event.preventDefault();

    const popup = window.open(
        "http://localhost:4080/oauth/github/login",
        "githubLogin",
        "width=600,height=700"
    );

    // Monitorear si la ventana emergente se cierra
    const checkPopup = setInterval(() => {
        if (popup.closed) {
            clearInterval(checkPopup);
        }
    }, 1000);
})