
//import data from './flavors.json' assert { type: 'json' };
//import data1 from './order.json' assert{type: 'json'};
let ordersHome = new Array() 
let homeFlavorsArray = new Array()
async function getFlavorsAPI(){
  const api_url = 'http://127.0.0.1:5000/flavors/'
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  for(let i = 0; i<data.length;i++){
    homeFlavorsArray.push(data[i])
  }
  console.log(homeFlavorsArray)
  updateFlavorCards()
  }



//createOrderArray();
// function createOrderArray(){
//   data1.orders.forEach((result, idx) => {
//     let order = { date:`${result.date}`,
//                   Id: `${result.Id}`,
//                   Items: `${result.Items}`,
//                   Price: `${result.Price}`,
//                   Quantity: `${result.Quantity}`,
//                   Total: `${result.Total}`
//               }
//     ordersHome.push(order)
//   })
//   window.localStorage.setItem('orders',JSON.stringify(ordersHome));
//   console.log(ordersHome);
// }
  
// window.onload = closeAddForm();

let cart = new Array();
loadCart();
// HomeloadFlavors();
// function createHomeFlavorsArray(){
//   data.flavors.forEach((result,idx) => {
//     let flavor = {
//                   flavor: `${result.flavor}`,
//                   price: `${result.price}`,
//                   image: `${result.image}`}
//                   console.log(flavor);
//     homeFlavorsArray.push(flavor);
//   })
  
// }
window.onload = getFlavorsAPI();
function updateFlavorCards(){

// if(homeFlavorsArray.length == 0){
//   createHomeFlavorsArray();
// }
const container = document.getElementById('cards');

while (container.firstChild){
  container.removeChild(container.firstChild);
}
homeFlavorsArray.forEach((result, idx) => {
  const card = document.createElement('div');
  card.classList = 'card-body';

  const content = `
  <div class="card">
            <div class="img-card">
            <img src="${homeFlavorsArray[idx].image}" alt="${homeFlavorsArray[idx].flavor}"></img>
                </div>
            <div class="add-cart"><button onclick="addToCart('${homeFlavorsArray[idx].flavor}')"id="${homeFlavorsArray[idx].flavor}">Add to Cart<button></div>
                <div class="info-card">
                <p><strong>${homeFlavorsArray[idx].flavor}</strong></p>
                <p>Price : ${homeFlavorsArray[idx].price}</p>
                </div>
        </div>`;
  container.innerHTML += content;
});
}
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

function storeCart(){
  window.localStorage.setItem("cart",JSON.stringify(cart));
console.log(cart);
}
function loadCart(){
  if(localStorage.cart == undefined){
    let cart = new Array();
  }
  else{
    cart = JSON.parse(localStorage.cart);
  }
}

// function HomeloadFlavors(){
//   console.log('entered loading');
//   if(localStorage.flavors == undefined){
//     return null;
//   }
//   else{
//     homeFlavorsArray = JSON.parse(localStorage.flavors);
//     updateFlavorCards();
    
//   }
// }
function addToCart(selectedFlavor){
  let i = 0;
  for(i;i<homeFlavorsArray.length;i++){
    if(homeFlavorsArray[i].flavor == selectedFlavor){
      cart.push(homeFlavorsArray[i]);
    }
  }
  console.log(cart);
  storeCart();
  setItemsCart();
}

function removeFromCart(){
      cart.length = 0;
    
  console.log(cart);
  storeCart();
  setItemsCart();
  console.log("After clearing:", cart);
  setItemsCart()
}
function setItemsCart(){
  document.getElementById('cartItems').innerText = 'Items in Cart: ' + cart.length;
}


// window.ready = ready
// function ready() {
//   var removeCartItemButtons = document.getElementsByClassName('btn-danger')
//   for (var i = 0; i < removeCartItemButtons.length; i++) {
//       var button = removeCartItemButtons[i]
//       button.addEventListener('click', removeCartItem)
//   }

//   var quantityInputs = document.getElementsByClassName('cart-quantity-input')
//   for (var i = 0; i < quantityInputs.length; i++) {
//       var input = quantityInputs[i]
//       input.addEventListener('change', quantityChanged)
//   }

//   var addToCartButtons = document.getElementsByClassName('add-cart')
//   for (var i = 0; i < addToCartButtons.length; i++) {
//       var button = addToCartButtons[i]
//       button.addEventListener('click', addToCartClicked)
//   }
// }

// window.purchaseClicked = purchaseClicked
// function purchaseClicked() {
//   alert('Thank you for your purchase')
//   var cartItems = document.getElementsByClassName('cart-items')[0]
//   while (cartItems.hasChildNodes()) {
//       cartItems.removeChild(cartItems.firstChild)
//   }
//   updateCartTotal()
// }

// function removeCartItem(event) {
//   var buttonClicked = event.target
//   buttonClicked.parentElement.parentElement.remove()
//   updateCartTotal()
// }

// function quantityChanged(event) {
//   var input = event.target
//   if (isNaN(input.value) || input.value <= 0) {
//       input.value = 1
//   }
//   updateCartTotal()
// }

// function addToCartClicked(event) {
//   var button = event.target
//   var shopItem = button.parentElement.parentElement
//   var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
//   var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
//   var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
//   addItemToCart(title, price, imageSrc)
//   updateCartTotal()
// }

// function addItemToCart(title, price, imageSrc) {
//   var cartRow = document.createElement('div')
//   cartRow.classList.add('cart-row')
//   var cartItems = document.getElementsByClassName('cart-items')[0]
//   var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
//   for (var i = 0; i < cartItemNames.length; i++) {
//       if (cartItemNames[i].innerText == title) {
//           alert('This item is already added to the cart')
//           return
//       }
//   }
//   var cartRowContents = `
//       <div class="cart-item cart-column">
//           <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//           <span class="cart-item-title">${title}</span>
//       </div>
//       <span class="cart-price cart-column">${price}</span>
//       <div class="cart-quantity cart-column">
//           <input class="cart-quantity-input" type="number" value="1">
//           <button class="btn btn-danger" type="button">REMOVE</button>
//       </div>`
//   cartRow.innerHTML = cartRowContents
//   cartItems.append(cartRow)
//   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
// }

// function updateCartTotal() {
//   var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//   var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//   var total = 0
//   for (var i = 0; i < cartRows.length; i++) {
//       var cartRow = cartRows[i]
//       var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//       var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//       var price = parseFloat(priceElement.innerText.replace('$', ''))
//       var quantity = quantityElement.value
//       total = total + (price * quantity)
//   }
//   total = Math.round(total * 100) / 100
//   document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
// }

window.openAddForm = openAddForm
//window.onload = closeAddForm()
function openAddForm() {
    
  document.getElementById("editFromGroup").style.display = "block";
}
function closeAddForm() {
  document.getElementById("editFromGroup").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  let modal = document.getElementById('openAddForm');
  if (event.target == modal) {
    closeAddForm();
  }
}




