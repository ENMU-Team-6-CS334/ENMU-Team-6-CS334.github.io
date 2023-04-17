import data from './order.json' assert { type: 'json' };

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

let ordersArray = new Array()
loadOrders();
function createArray(){
data.orders.forEach((result, idx) => {
  let order = { date:`${result.date}`,
                Id: `${result.Id}`,
                Items: `${result.Items}`,
                Price: `${result.Price}`,
                Quantity: `${result.Quantity}`,
                Total: `${result.Total}`
            }
  ordersArray.push(order)
})}

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
window.onload = closeForm(),updateOrderTable(),closeAddForm();



function updateOrderTable(){
    if (ordersArray.length == 0){
        createArray();
    }
    
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
        for(i;i < ordersArray[idx].Items.length;i++){
            itemsArray[i] = ordersArray[idx].Items[i];
        }
        i = 0;
        
        const card = document.createElement('tr');
        card.classList = idx +'tableRow';
        
        
        const content = `
        <td class="column1">${ordersArray[idx].date}</td>
        <td class="column2" id="${ordersArray[idx].Id}" onclick="IDclicked(${ordersArray[idx].Id})">${ordersArray[idx].Id}</td>
        <td class="column3">${ordersArray[idx].Items}</td>
        <td class="column4">$${ordersArray[idx].Price}</td>
        <td class="column5">${ordersArray[idx].Quantity}</td>
        <td class="column6">$${ordersArray[idx].Total}</td>
        </div>`;
       
        container.innerHTML += content;
      });
      storeOrders();
    }

    function IDclicked(enteredID){
        let k = 0;
        for(k;k < ordersArray.length;k++){
            if(ordersArray[k].Id == enteredID){
                // document.getElementById('idField').setAttribute('placeholder',ordersArray[k].ID);
                // console.log(document.getElementById('idField').getAttribute('placeholder'));
                document.getElementById('idField').value = ordersArray[k].Id;
                return;
            }
        }
    }

    function deleteOrder(enteredOrderID){
        let l = 0;
        for(l;l < ordersArray.length;l++){
            if(ordersArray[l].Id == enteredOrderID){
                ordersArray.splice(l,1);
            }
        }
        l = 0;
        updateOrderTable();
    }

    function addOrder(date,id,flavors,price,quant){
        let newOrder ={
                date: date,
                Id: id,
                Items: flavors,
                Price: price,
                Quantity: quant,
                Total: price*quant
        }
        ordersArray.push(newOrder);
        updateOrderTable();
    }

    function editOrder(enteredOrderID, newDate,newID,newItems,newPrice,newQuant,newTotal){
        let p = 0;
        for(p;p<ordersArray.length;p++){
            if(ordersArray[p].Id == enteredOrderID){
                let newOrder = {
                    date: newDate,
                    Id: newID,
                    Items: newItems,
                    Price: newPrice,
                    Quantity: newQuant,
                    Total: newTotal
                };
                ordersArray[p] = newOrder;
            }
        }
        p = 0;
        updateOrderTable();
    }

    function getOrderInfo(enteredOrderID){
        let u = 0
        for(u;u<ordersArray.length;u++){
            if(ordersArray[u].Id == enteredOrderID){
                return ordersArray[u];
            }
        }
    }

    
    function setEditOrder(){

        let selectedOrder = getOrderInfo(document.getElementById('idField').value)
        

        document.getElementById('editdate').value = selectedOrder.date;
        document.getElementById('editid').value =  selectedOrder.Id;
        document.getElementById('editflavors').value = selectedOrder.Items;
        document.getElementById('editprice').value = selectedOrder.Price;
        document.getElementById('editQuantity').value = selectedOrder.Quantity;
        document.getElementById('editTotal').value = selectedOrder.Total;

        
    }

    function userEditOrder(){
        let userSelectedID = document.getElementById('idField').value
        let userDate = document.getElementById('editdate').value;
        let userID = document.getElementById('editid').value;
        let userFlavors = document.getElementById('editflavors').value;
        let userPrice = document.getElementById('editprice').value;
        let userQuant = document.getElementById('editQuantity').value;
        let userTotal = (document.getElementById('editprice').value)*(document.getElementById('editQuantity').value);
        editOrder(userSelectedID,userDate,userID,userFlavors,userPrice,userQuant,userTotal);
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

    function loadOrders(){
        if (localStorage.orders == undefined){
            return null
        }
        else{
            ordersArray = JSON.parse(localStorage.orders);
            updateOrderTable();
            console.log(ordersArray);
            return ordersArray;
        }
       }
    
    