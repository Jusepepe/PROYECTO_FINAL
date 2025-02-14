const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    let formData = new FormData(form);
    let data = Object.fromEntries(formData);
    let jsonData = JSON.stringify(data);

    event.preventDefault();
    fetch('https://proyecto-final-untf.onrender.com/user/login', {
        method: 'POST',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
        body: jsonData,
    }).then(res => res.json())
    .then(result => {
        if(result.message === "El usuario ya está logeado") window.location.href = "https://proyecto-final-untf.onrender.com/board/index.html"
    })
    .catch(err => console.log(err))


}

const oauth = document.getElementById("oauth");

oauth.addEventListener('click',(event)=> {
    event.preventDefault();

    const popup = window.open(
        "https://proyecto-final-untf.onrender.com/oauth/github/login",
        "githubLogin",
        "width=600,height=700"
    );

    // Monitorear si la ventana emergente se cierra
    const checkPopup = setInterval(() => {
        if (popup.closed) {
            clearInterval(checkPopup);
            window.location.href = "https://proyecto-final-untf.onrender.com/board/index.html"
        }
    }, 1000);
})