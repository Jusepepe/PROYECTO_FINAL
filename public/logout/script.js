const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event){

    event.preventDefault();
    fetch('https://proyecto-final-untf.onrender.com/user/logout', {
        method: 'POST',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
    }).then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
}