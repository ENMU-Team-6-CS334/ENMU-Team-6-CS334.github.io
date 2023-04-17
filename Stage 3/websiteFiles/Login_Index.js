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
        let pass = document.querySelector("#pw").value;
        if (pass == ""){
            alert("Enter a password");
            e.preventDefault();
        }
    });
}



    