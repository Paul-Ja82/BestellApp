
function removeFoodAmount(i) {
    if (myDishes[i].amount > 0) {
        myDishes[i].amount -= 1;
        updateStorage();
    }
}

function deleteFromCart(i) {
    myDishes[i].amount = 0;
    updateStorage();
}

function saveCart() {
    let cartItems = [];
    for (let i = 0; i < myDishes.length; i++) {
        if (myDishes[i].amount > 0) {
            cartItems.push(myDishes[i]);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function loadCart() {
    let storedCart = localStorage.getItem('cart');
    if (storedCart) {
        let savedDishes = JSON.parse(storedCart);
        for (let i = 0; i < savedDishes.length; i++) {
            for (let j = 0; j < myDishes.length; j++) {
                if (myDishes[j].name === savedDishes[i].name) {
                    myDishes[j].amount = savedDishes[i].amount;
                }
            }
        }
    }
}

function selectOption(option) {
    let deliveryButton = document.getElementById('deliveryButton');
    let pickupButton = document.getElementById('pickupButton');

    if (option === 'delivery') {
        deliveryFee = 5.00;
        deliveryButton.style.backgroundColor = "greenyellow";
        pickupButton.style.backgroundColor = "";
        localStorage.setItem('selectedOption', 'delivery');
    } else if (option === 'pickup') {
        deliveryFee = 0;
        pickupButton.style.backgroundColor = "greenyellow";
        deliveryButton.style.backgroundColor = "";
        localStorage.setItem('selectedOption', 'pickup');
    }
    updateCart();
}

function loadSelectedOption() {
    let selectedOption = localStorage.getItem('selectedOption');
    let deliveryButton = document.getElementById('deliveryButton');
    let pickupButton = document.getElementById('pickupButton');

    if (selectedOption === 'delivery') {
        deliveryFee = 5.00;
        deliveryButton.style.backgroundColor = "greenyellow";
        pickupButton.style.backgroundColor = "";
    } else if (selectedOption === 'pickup') {
        deliveryFee = 0;
        pickupButton.style.backgroundColor = "greenyellow";
        deliveryButton.style.backgroundColor = "";
    }
}

function updateCart() {
    let cartItems = document.getElementById('cartItems');
    let cartTotal = document.getElementById('cartTotal');
    let smallCartCount = document.getElementById('smallCartCount');
    let smallCartTotal = document.getElementById('smallCartTotal');
    cartItems.innerHTML = '';
    let subtotal = 0;
    let totalCount = 0;
    let withDish = false;

    for (let i = 0; i < myDishes.length; i++) {
        let dish = myDishes[i];
        if (dish.amount > 0) {
            totalCount += dish.amount;
            withDish = true;
            cartItems.innerHTML += getCartDishTemplate(dish, i);
            subtotal += dish.price * dish.amount;
        }
    }

    let total = subtotal + deliveryFee;
    smallCartCount.textContent = totalCount;
    smallCartTotal.textContent = total.toFixed(2) + ' €';

    if (withDish) {
        document.getElementById('deliveryOptions').style.display = 'block';
        document.getElementById('orderButton').style.display = 'block';
    } else {
        document.getElementById('deliveryOptions').style.display = 'none';
        document.getElementById('orderButton').style.display = 'none';
        document.getElementById('deliveryButton').style.backgroundColor = '';
        document.getElementById('pickupButton').style.backgroundColor = '';
        localStorage.removeItem('selectedOption');
        deliveryFee = 0;
    }

    cartItems.innerHTML += getSubtotalTemplate(subtotal);

    cartTotal.innerHTML = `Gesamtbetrag: ${total.toFixed(2)} €`;
}

function Order() {
    let selectedOption = localStorage.getItem('selectedOption');
    if (!selectedOption) {
        showAlert('Bitte wählen Sie eine Lieferoption aus, bevor Sie die Bestellung aufgeben. ツ');
    } else {
        showAlert('Ihre Bestellung wurde erfolgreich aufgegeben. ヅ');
    }
}
