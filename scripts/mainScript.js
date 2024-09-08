let hamburger = document.getElementById('hamburger');
let navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

function updateStorage() {
    localStorage.setItem('myDishes', JSON.stringify(myDishes));
    saveCart();
    show();
    updateCart();
}

function addFoodAmount(i) {
    myDishes[i].amount += 1;
    updateStorage();
}

function show() {
    document.getElementById('foodList').innerHTML = '';
    if (localStorage.getItem('myDishes')) {
        myDishes = JSON.parse(localStorage.getItem('myDishes'));
    }
    for (let i = 0; i < myDishes.length; i++) {
        let dish = myDishes[i];
        document.getElementById('foodList').innerHTML += getDishTemplate(dish, i);
    }
}

let deliveryFee = 0;

function showAlert(message) {
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('alert').style.display = 'block';
}

function closeAlert() {
    document.getElementById('alert').style.display = 'none';
}

function toggleCart() {
    let cart = document.querySelector('.cart');
    let smallCartIcon = document.getElementById('smallCartIcon');

    if (cart.style.display === 'block') {
        cart.style.display = 'none';
        smallCartIcon.innerHTML = 'Warenkorb anzeigen 🛒';
    } else {
        cart.style.display = 'block';
        smallCartIcon.innerHTML = 'Warenkorb nicht zeigen 🛒';
    }
}

let previousWidth = window.innerWidth;

window.addEventListener('resize', function() {
    let currentWidth = window.innerWidth;

    if (previousWidth <= 769 && currentWidth > 770) {
        location.reload(); 
    }

    previousWidth = currentWidth;
});


loadSelectedOption();
loadCart();
show();
updateCart();