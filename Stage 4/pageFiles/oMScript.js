let ordersArray = new Array()
async function getOrdersAPI(){
    const api_url = 'http://127.0.0.1:5000/orders/'
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    for(let i = 0; i<data.length;i++){
      ordersArray.push(data[i])
    }
    console.log(ordersArray)
    updateOrderTable()
    }
window.IDclicked = IDclicked;
window.updateOrderTable = updateOrderTable;
window.setEditOrder = setEditOrder;
window.getOrderInfo = getOrderInfo;
window.userEditOrder = userEditOrder;
window.userRemoveOrder = userRemoveOrder;
window.openForm = openForm
window.closeForm = closeForm
window.openAddForm = openAddForm
window.closeAddForm = closeAddForm
window.userAddOrder = userAddOrder


// function createArray(){
// data.orders.forEach((result, idx) => {
//   let order = { date:`${result.date}`,
//                 Id: `${result.Id}`,
//                 Items: `${result.Items}`,
//                 Price: `${result.Price}`,
//                 Quantity: `${result.Quantity}`,
//                 Total: `${result.Total}`
//             }
//   ordersArray.push(order)
// })}

function openForm() {
    document.getElementById("editForm").style.display = "block";
  }
  function closeForm() {
    document.getElementById("editForm").style.display = "none";
  }
function openAddForm(){
    document.getElementById("addForm").style.display = "block";
}
function closeAddForm(){
    document.getElementById("addForm").style.display = "none";
}
window.onload = getOrdersAPI(),closeForm(),closeAddForm();



function updateOrderTable(){
    // if (ordersArray.length == 0){
    //     createArray();
    // }
    
    const container = document.getElementById('tableContents');

    //This while statement removes all of the current cards on the page
    //This is so that when you add a new flavor it will not place all of
    //the previous cards for a second time.
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
      
    //This forEach function goes through every element in the flavorsArray
    //array. It then prints out onto the html file all of the cards that
    //are in the flavorsArray array.
    
    ordersArray.forEach((result, idx) =>{
        let i = 0
        let itemsArray = new Array();
        for(i;i < ordersArray[idx].length;i++){
            itemsArray[i] = ordersArray[idx].Items[i];
        }
        i = 0;
        
        const card = document.createElement('tr');
        card.classList = idx +'tableRow';
        
        
        const content = `
        <td class="column1">${ordersArray[idx].date}</td>
        <td class="column2" id="${ordersArray[idx].id}" onclick="IDclicked(${ordersArray[idx].id})">${ordersArray[idx].id}</td>
        <td class="column3">${ordersArray[idx].items}</td>
        <td class="column4">$${ordersArray[idx].price}</td>
        <td class="column5">${ordersArray[idx].quant}</td>
        <td class="column6">$${ordersArray[idx].total}</td>
        </div>`;
       
        container.innerHTML += content;
      });
    //   storeOrders();
    }

    function IDclicked(enteredID){
        let k = 0;
        for(k;k < ordersArray.length;k++){
            if(ordersArray[k].id == enteredID){
                // document.getElementById('idField').setAttribute('placeholder',ordersArray[k].ID);
                // console.log(document.getElementById('idField').getAttribute('placeholder'));
                document.getElementById('idField').value = ordersArray[k].id;
                return;
            }
        }
    }

    function deleteOrder(enteredOrderID){
        let orderDelete = {
            date: "",
            id: enteredOrderID,
            items: "",
            price: 0,
            quant: 0,
            total: 0
          };
          let postJSON = JSON.stringify(orderDelete)
          console.log(postJSON)
          fetch("http://127.0.0.1:5000/orders/", {
            method: "DELETE",
            body: JSON.stringify(orderDelete),
            headers: {
              "Content-type": "application/json"
            }
          });
        getOrdersAPI();
        updateOrderTable();
        location.reload(true)
        updateOrderTable();
    }

    function addOrder(date,id,flavors,price,quant){
      console.log("entered addOrder" + "*" * 30)
        // let newOrder ={
        //         date: date,
        //         id: id,
        //         items: flavors,
        //         price: price,
        //         quant: quant,
        //         total: price*quant
        // }
        // ordersArray.push(newOrder);
        let orderPost = {
            date: date,
            id: id,
            items: flavors,
            price: price,
            quant: quant,
            total: price*quant
          };
          let postJSON = JSON.stringify(orderPost)
          console.log(postJSON)
          fetch("http://127.0.0.1:5000/orders/", {
            method: "POST",
            body: JSON.stringify(orderPost),
            headers: {
              "Content-type": "application/json"
            }
          });
        getOrdersAPI();
        location.reload(true)
        updateOrderTable();
    }

    function editOrder(enteredOrderID, newDate,newID,newItems,newPrice,newQuant){
        deleteOrder(enteredOrderID)
        location.reload(true)
        location.reload(true)
        console.log(newDate)
        console.log(newID)
        console.log(newItems)
        console.log(newPrice)
        console.log(newQuant)
        addOrder(newDate,newID,newItems,newPrice,newQuant)
        getOrdersAPI();
        updateOrderTable();
    }

    function getOrderInfo(enteredOrderID){
        let u = 0
        for(u;u<ordersArray.length;u++){
            if(ordersArray[u].id == enteredOrderID){
                return ordersArray[u];
            }
        }
    }

    
    function setEditOrder(){

        let selectedOrder = getOrderInfo(document.getElementById('idField').value)
        

        document.getElementById('editdate').value = selectedOrder.date;
        document.getElementById('editid').value =  selectedOrder.id;
        document.getElementById('editflavors').value = selectedOrder.items;
        document.getElementById('editprice').value = selectedOrder.price;
        document.getElementById('editQuantity').value = selectedOrder.quant;
        document.getElementById('editTotal').value = selectedOrder.total;

        
    }

    function userEditOrder(){
        let userSelectedID = document.getElementById('idField').value
        let userDate = document.getElementById('editdate').value;
        let userID = document.getElementById('editid').value;
        let userFlavors = document.getElementById('editflavors').value;
        let userPrice = document.getElementById('editprice').value;
        let userQuant = document.getElementById('editQuantity').value;
        let userTotal = (document.getElementById('editprice').value)*(document.getElementById('editQuantity').value);
        editOrder(userSelectedID,userDate,userID,userFlavors,userPrice,userQuant);
        closeForm();
        document.getElementById('editdate').value ="";
        document.getElementById('editid').value = "";
        document.getElementById('editflavors').value = "";
        document.getElementById('editprice').value = "";
        document.getElementById('editQuantity').value = "";
        document.getElementById('editTotal').value = "";

    }

    function userRemoveOrder(){
        let userSelectedID = document.getElementById('idField').value;
        deleteOrder(userSelectedID);
    }

    function userAddOrder(){
        let userAddDate = document.getElementById('addDate').value;
        let userAddID = document.getElementById('addID').value;
        let userAddFlavor = document.getElementById('addFlavors').value;
        let userAddPrice = document.getElementById('addPrice').value;
        let userAddQuant = document.getElementById('addQuant').value;
        addOrder(userAddDate,userAddID,userAddFlavor,userAddPrice,userAddQuant);
        document.getElementById('addDate').value = "";
        document.getElementById('addID').value = "";
        document.getElementById('addFlavors').value = "";
        document.getElementById('addPrice').value = "";
        document.getElementById('addQuant').value = "";
        closeAddForm();
    }

    function storeOrders(){
        console.log(ordersArray)
        window.localStorage.setItem("orders",JSON.stringify(ordersArray));
    }

    // function loadOrders(){
    //     if (localStorage.orders == undefined){
    //         return null
    //     }
    //     else{
    //         ordersArray = JSON.parse(localStorage.orders);
    //         updateOrderTable();
    //         console.log(ordersArray);
    //         return ordersArray;
    //     }
    //    }
    
    