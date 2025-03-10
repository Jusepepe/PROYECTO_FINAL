document.onload = () => {
    fetch(`https://proyecto-final-untf.onrender.com/user/myAccount`, {
        method: 'GET',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
        body: jsonData,
    }).then(res => res.json())
    .then(result => {
        console.log(result)
        if(!result.user) window.location.href = 'https://proyecto-final-untf.onrender.com/login/index.html';
    })
    .catch(err => console.log(err))
}

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {

    let formData = new FormData(form);
    let data = Object.fromEntries(formData);
    let jsonData = JSON.stringify(data);

    event.preventDefault();
    fetch(`https://proyecto-final-untf.onrender.com/product`, {
        method: 'POST',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
        body: jsonData,
    }).then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))


});

const form2 = document.getElementById('form2');
form2.addEventListener('submit', (event) => {
    
    let formData = new FormData(form2);
    let data = Object.fromEntries(formData);
    let id = data.id;
    let quantity = data.quantity;

    event.preventDefault();
    fetch(`https://proyecto-final-untf.onrender.com/product/${id}/${quantity}`, {
        method: 'PATCH',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
    }).then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))


});

const form3 = document.getElementById('form3');
form3.addEventListener('submit', (event) => {
    
    let formData = new FormData(form3);
    let data = Object.fromEntries(formData);
    let id = data.id;

    event.preventDefault();
    fetch(`https://proyecto-final-untf.onrender.com/product/${id}`, {
        method: 'GET',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
    }).then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))


});


const productList = document.getElementById("products");
const cartList = document.getElementById("cart");
const myProducts = document.getElementById("myProducts");

const productButton = document.getElementById("showProducts");

productButton.addEventListener('click',(event)=> {
    event.preventDefault();

    fetch('https://proyecto-final-untf.onrender.com/product/', {
        method: 'GET',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
    }).then(res => res.json())
    .then(products => {
        console.log(products)
        productList.innerHTML = "";
        products.forEach(product => {
            let newElement = document.createElement("li");
            let text = document.createTextNode(`${JSON.stringify(product)}`)
            newElement.appendChild(text);
            productList.appendChild(newElement);
        })
    })
    .catch(err => console.log(err))
})

const cartButton = document.getElementById("showCart");

cartButton.addEventListener('click',(event)=> {
    event.preventDefault();

    fetch('https://proyecto-final-untf.onrender.com/user/myCarts', {
        method: 'GET',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
    }).then(res => res.json())
    .then(cart => {
        cartList.innerHTML = "";
        let newElement = document.createElement("li");
        let text = document.createTextNode(`${JSON.stringify(cart)}`)
        newElement.appendChild(text);
        cartList.appendChild(newElement);        
    })
    .catch(err => console.log(err))
})

const payButton = document.getElementById("pay");

payButton.addEventListener('click', (event) => {
    event.preventDefault();

    const popup = window.open(
        "https://proyecto-final-untf.onrender.com/payments/start",
        "Pago",
        "width=600,height=700"
    );

    // Monitorear si la ventana emergente se cierra
    const checkPopup = setInterval(() => {
        if (popup.closed) {
            clearInterval(checkPopup);
        }
    }, 1000);
})

const form4 = document.getElementById('form4');
form4.addEventListener('submit', (event)=>{
    console.log("logout")
    event.preventDefault();
    fetch('https://proyecto-final-untf.onrender.com/user/logout', {
        method: 'POST',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
    }).then(res => res.json())
    .then(result => {console.log(result)
        window.location.href='https://proyecto-final-untf.onrender.com/login/index.html'}
    )
    .catch(err => console.log(err))});

const myProductsButton = document.getElementById("showMyProducts");

myProductsButton.addEventListener('click',(event)=> {
    event.preventDefault();

    fetch('https://proyecto-final-untf.onrender.com/cart/myProducts', {
        method: 'GET',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
    }).then(res => res.json())
    .then(products => {
        myProducts.innerHTML = "";
        let newElement = document.createElement("li");
        let text = document.createTextNode(`${JSON.stringify(products)}`)
        newElement.appendChild(text);
        myProducts.appendChild(newElement);        
    })
    .catch(err => console.log(err))
})

const form5 = document.getElementById('form5');
form5.addEventListener('submit', (event) => {
    
    let formData = new FormData(form5);
    let data = Object.fromEntries(formData);
    let id = data.id;
    let quantity = data.quantity;

    event.preventDefault();
    fetch(`https://proyecto-final-untf.onrender.com/cart/add/${id}/${quantity}`, {
        method: 'PATCH',
        credentials: "include",
        headers: {'Content-Type' : 'application/json'},
    }).then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))


});