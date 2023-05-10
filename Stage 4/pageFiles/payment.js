console.log(localStorage.cart)
window.removeFromCart = removeFromCart
window.checkout = checkout
let paymentCartArray = new Array();

if(localStorage.cart != undefined){
    paymentCartArray = JSON.parse(localStorage.cart);
}

console.log(paymentCartArray[0])
function createPaymentCartArray(){
    return;
}
window.onload = updateCart(),getEmailAPI;
function updateCart(){
    const container = document.getElementById('cartCards');

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    paymentCartArray.forEach((result,idx) =>{
        const card = document.createElement('div');
        card.classList = 'card-body';

        const content = `
        <div class="card">
              <div class="img-card">
                  <img src="${paymentCartArray[idx].image}" alt="${paymentCartArray[idx].flavor}">
              </div>
              <div class="add-cart"><button id="${idx}" onclick="removeFromCart(${idx})">Remove</button></div>
              <div class="info-card">
                <p id="${paymentCartArray[idx].flavor}flavor"><strong>${paymentCartArray[idx].flavor}</strong></p>
                <p id="${paymentCartArray[idx].flavor}price">${paymentCartArray[idx].price}<p>
              </div>
          </div>
        `;
        container.innerHTML += content;
        // console.log(idx + " " + paymentCartArray[idx].flavor);
    });
    setTotal();
}

function removeFromCart(index){
    paymentCartArray.splice(index,1);
    updateCart();
}

function setTotal(){
    let total = 0;
    let i = 0;
    for(i;i<paymentCartArray.length;i++){
        total = parseInt(total) + parseInt(paymentCartArray[i].price);
    }
    document.getElementById('totalAmount').textContent = "Total: $" + total;
}
function getTotal(){
    let total = 0;
    let o = 0;
    for(o;o<paymentCartArray.length;o++){
        total = parseInt(total) + parseInt(paymentCartArray[o].price);
    }
    return total;
}
function checkout(){
    console.log("entering loading")
     let orders = JSON.parse(localStorage.orders);
    let date = new Date();
    let newOrder = {
        date: (date.getDay()+"/"+(date.getMonth() + 1)+"/"+date.getFullYear()),
        id: Number(orders[orders.length-1].id) + 1,
        Price: paymentCartArray[0].price,
        items: getAllFlavors(),
        quant: getQuant(),
        total: getTotal(),
    }
    
    let email = document.getElementById("emailField").value 
    console.log(email)
    addOrder(newOrder.date,newOrder.id,newOrder.items,newOrder.Price,newOrder.quant)
    console.log(orders);
    
    purchased();
    // sendEmail(email,newOrder.date,newOrder.id,newOrder.items,newOrder.quant,newOrder.total)
    
}

function getAllFlavors(){
    let k = 0;
    let allFlavors = "";
    for(k;k<paymentCartArray.length;k++){
        let newFlavor = paymentCartArray[k].flavor;
        allFlavors += newFlavor + ", ";
    }
    return allFlavors
}
function getQuant(){
    let j = 0;
    let quant = 0;
    for(j;j<paymentCartArray.length;j++){
        quant+=1;
    }
    return quant;
}
// window.localStorage.removeItem("orders");
window.getAllFlavors = getAllFlavors;
window.getQuant = getQuant;
window.getTotal = getTotal;

function purchased(){
    window.localStorage.removeItem('cart');
    alert("Congratulations on your order has been placed");
    paymentCartArray = new Array();
}

function sendEmail(email,date,id,items,quant,total){
    let emailPost = {
        email: email,
        cart: items.length,
        allFlavors: items,
        Total: total
      };
      let postJSON = JSON.stringify(emailPost)
      console.log(postJSON)
      fetch("http://127.0.0.1:5000/sendEmail", {
        method: "POST",
        body: JSON.stringify(postJSON),
        headers: {
          "Content-type": "application/json"
        }
      });
}

async function getEmailAPI(){
    const api_url = 'http://127.0.0.1:5000/sendEmail'
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    }
