const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    let formData = new FormData(form);
    let data = Object.fromEntries(formData);
    let jsonData = JSON.stringify(data);

    event.preventDefault();
    fetch('https://proyecto-final-untf.onrender.com/user/register', {
        method: 'POST',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
        body: jsonData,
    }).then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))


}