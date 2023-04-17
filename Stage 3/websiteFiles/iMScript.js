import data from './flavors.json' assert { type: 'json' };

window.openForm = openForm;
window.updateCards = updateCards;
window.closeForm = closeForm;
window.openCreateForm = openCreateForm;
window.closeCreateForm = closeCreateForm;
window.addFlavor = addFlavor;
window.removeFlavor = removeFlavor;
window.editFlavor = editFlavor;
window.getFlavorInfo = getFlavorInfo;
window.setEditExample = setEditExample;
window.userEditFlavor = userEditFlavor;
window.userAddFlavor = userAddFlavor;
window.userRemoveFlavor = userRemoveFlavor;

//This block of code creates an array and creates new objects based
//on the objects in the json file into the new array. This is so that
//we can add and remove elements in the array.
let flavorsArray = new Array()
loadFlavors();

function createFlavorsArray(){
  data.flavors.forEach((result, idx) => {
  let flavor = {flavor:`${result.flavor}`,
                price: `${result.price}`,
                image: `${result.image}`}
  flavorsArray.push(flavor)
})
}


//Calls the updateCards function when the page loads so that the 
//objects in the json file are initiated and shown on the page.
window.onload = updateCards(),closeForm(),closeCreateForm();

//Function updates the cards on the page
function updateCards(){

          if (flavorsArray.length == 0){
            createFlavorsArray();
          }
          const container = document.getElementById('inventoryCards');

          //This while statement removes all of the current cards on the page
          //This is so that when you add a new flavor it will not place all of
          //the previous cards for a second time.
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
            
          //This forEach function goes through every element in the flavorsArray
          //array. It then prints out onto the html file all of the cards that
          //are in the flavorsArray array.
          flavorsArray.forEach((result, idx) =>{
              const card = document.createElement('div');
              card.classList = 'card-body';

              const content = `
                  <div class="card" id="${idx}">
                  <div class="img-card">
                  <img src="${flavorsArray[idx].image}" alt="${flavorsArray[idx].flavor}"></img>
                  </div>
                  <div class="add-cart"><button onclick="openForm(),document.getElementById('editForm').scrollIntoView(),setEditExample('${flavorsArray[idx].flavor}')" id="${flavorsArray[idx].flavor}Button">Edit</button>
                  </div>
                  <div class="info-card">
                      <p><strong>${flavorsArray[idx].flavor}</strong></p>
                      <p>Price : ${flavorsArray[idx].price}$</p>
                  </div>  
              </div>`;
              container.innerHTML += content;
              console.log(idx + " " +flavorsArray[idx].flavor);

            });
            storeFlavors();
          }

//Functions to open Popups
function openForm() {
    
    document.getElementById("editForm").style.display = "block";
    closeCreateForm()
  }
  function closeForm() {
    document.getElementById("editForm").style.display = "none";
  }
  function openCreateForm() {
    document.getElementById("createForm").style.display = "block";
    closeForm()
  }
  function closeCreateForm() {
    document.getElementById("createForm").style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    let modal = document.getElementById('editForm');
    if (event.target == modal) {
      closeForm();
    }
  }
 
//This function adds a flavor to the flavorsArray array and updates the
//cards on the page.
function addFlavor(flavor, price, img){
  let newFlavor = {flavor: flavor,
                price: price,
                image: img};
  console.log(newFlavor);
  flavorsArray.push(newFlavor);
  updateCards();
}

//This function removes a flavor that is entered as a parameter and
//updates the cards on the page.
function removeFlavor(flavorEntered){
  let k = 0;
  for(k;k < flavorsArray.length; k++){
    if(flavorsArray[k]!= null){
      if (flavorsArray[k].flavor == flavorEntered){
         flavorsArray.splice(k,1);
      }
    }
  }
  k = 0;
  updateCards();
}

//This function edits a flavor that is entered as a parameter and
//updates the cards on the page.
function editFlavor(flavorEntered, newFlavor, newPrice, newImg){
  let j = 0;
  for(j;j < flavorsArray.length; j++){
    
    if (flavorsArray[j].flavor == flavorEntered){
        let newFlavorObject = {flavor: newFlavor,
                      price: newPrice,
                      image: newImg};
        flavorsArray[j] = newFlavorObject;
    }
  }
  j = 0;
  updateCards();
}

function getFlavorInfo(enteredFlavor){
  let i = 0;
  for(i;i <flavorsArray.length;i++){
    if(flavorsArray[i].flavor == enteredFlavor){
      let selectedPrice = flavorsArray[i].price;
      let selectedImage = flavorsArray[i].image;
      let selectedFlavor = flavorsArray[i].flavor;
      return flavorsArray[i];
    }
  }
}

function setEditExample(enteredFlavor){
  let selectedExampleFlavor = getFlavorInfo(enteredFlavor);
    
  document.getElementById("selectedEditFlavor").innerHTML = selectedExampleFlavor.flavor;
  document.getElementById("selectedEditPrice").innerHTML = "Price: " + selectedExampleFlavor.price + "$";
  document.getElementById("emptyEditImg")["src"] = selectedExampleFlavor.image
  selectedEditPrice = selectedExampleFlavor.price;
  selectedEditFlavor = selectedExampleFlavor.flavor;

  // document.getElementById("selectedEditFlavor").innerHTML = enteredFlavor.flavor;
  // document.getElementById("selectedEditPrice").innerHTML = "Price: " + enteredFlavor.price + "$";
  // document.getElementById("emptyEditImg")["src"] = enteredFlavor.image;
  
  // By Index
  // document.getElementById("selectedEditFlavor").innerHTML = flavorsArray[enteredFlavor].flavor;
  // document.getElementById("selectedEditPrice").innerHTML = flavorsArray[enteredFlavor].price;
  // document.getElementById("emptyEditImg")["src"] = flavorsArray[enteredFlavor].image;
}

function userEditFlavor(){
  let userFlavor = document.getElementById('flavor').value;
  let userPrice = document.getElementById('price').value;
  let userImage = document.getElementById('imageEdit').value;
  let userSelectedFlavor = document.getElementById('selectedEditFlavor').innerHTML;
  let userSelectedPrice = document.getElementById('selectedEditPrice').innerHTML[7];
  if(userFlavor == ""){
    editFlavor(userSelectedFlavor,userSelectedFlavor,userPrice,document.getElementById("emptyEditImg")["src"]);
    closeForm();
    document.getElementById('flavor').value = "";
    document.getElementById('price').value= "";
    return;
  }
  if(userPrice ==""){
    editFlavor(userSelectedFlavor,userFlavor,userSelectedPrice,document.getElementById("emptyEditImg")["src"]);
    closeForm();
    document.getElementById('flavor').value = "";
    document.getElementById('price').value= "";
    return;
  }
  editFlavor(userSelectedFlavor,userFlavor,userPrice,"");
  closeForm();
  document.getElementById('flavor').value = "";
  document.getElementById('price').value= "";
}

function userAddFlavor(){
  let userAddFlavor = document.getElementById('flavorAdd').value;
  let userAddPrice = document.getElementById('priceAdd').value;
  let userAddImage = document.getElementById('imageAdd');
  addFlavor(userAddFlavor,userAddPrice,'');
  closeCreateForm();
  document.getElementById('flavorAdd').value = "";
  document.getElementById('priceAdd').value= "";
}

function userRemoveFlavor(){
  let userSelectedFlavor = document.getElementById('selectedEditFlavor').innerHTML;
  removeFlavor(userSelectedFlavor);
  closeForm();
}

function storeFlavors(){
  console.log(flavorsArray)
  window.localStorage.setItem("flavors",JSON.stringify(flavorsArray));
}

function loadFlavors(){
  if(localStorage.flavors == undefined){
    return null;
  }
  else{
    flavorsArray = JSON.parse(localStorage.flavors);
    updateCards();
    console.log(flavorsArray);
    return flavorsArray;
  }
}

function readImage(file) {
  // Check if the file is an image.
  if (file.type && !file.type.startsWith('image/')) {
    console.log('File is not an image.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    img.src = event.target.result;
  });
  reader.readAsDataURL(file);
}















