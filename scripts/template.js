function getDishTemplate(dish, i) {
    return `
        <div class="dishesDiv">
          <div class="foodList">
            <div class="name">${dish['name']}</div>
            <div class="description">${dish['description']}</div>
            <div class="price">${dish['price'].toFixed(2)} €</div>
          </div>
           <button class="amountButton" onclick="addFoodAmount(${i})"> + </button>
        </div>
      `;
}


function getCartDishTemplate(dish, i) {
    return `
<div class="cartItemDiv">
    <div class="cartNames">
     <span>${dish['name']}</span>
    </div>
    <div class="cartItem">
     <button class="amountButton" onclick="removeFoodAmount(${i})">-</button>
     <span>${dish.amount}x</span>
     <button class="amountButton" onclick="addFoodAmount(${i})">+</button>
     <span>${(dish['price'] * dish.amount).toFixed(2)} €</span>
     <button class="delateButton" onclick="deleteFromCart(${i})"><img class="imgTrash" src=imgEcc/trash.ico></button>
    </div>
   </div>
`;
}

function getSubtotalTemplate(subtotal) {
  return`
        <div class="subtotalDiv">
            <span class="subtotal">Zwischensumme: ${subtotal.toFixed(2)} €</span>
        </div>
    `;
}
