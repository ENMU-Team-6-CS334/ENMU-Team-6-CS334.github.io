let user = "David"
let cp = "1234"
function getUsername(){
    const username = document.querySelector('input').value;
    console.log(username)
}
function getPassword(){
    const password = document.getElementById("MyPassword").value;
    console.log(password)
}
function needPassword(){
    const password = document.getElementById("MyPassword").value;
    if (password == ""){
        alert("Enter a password");
    }

    document.querySelector("#loginForm").addEventListener("submit", function(e) {
        let pass = document.getElementById("MyPassword").value;
        let eUser = document.getElementById("Username").value;
        if (pass == "" || eUser ==""){
            alert("Enter a password");
            e.preventDefault();
        }
        else if(pass == cp && eUser == user){
            
        }
        else{
            console.log("incorrect")
            alert("Incorrect username or password.")
            e.preventDefault();

        }
        

    });
}



    