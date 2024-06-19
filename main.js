// ------------------------------- Global Data Members -------------------------------
let validPassword = false;
let validName = false;

// ------------------------------- HTML Elements -------------------------------
let home = document.getElementById("section-1");
let userView = document.getElementById("section-4");
let welcomeMessage = document.getElementById("welcome-message");

let signupButton = document.getElementById("signup-button");
let loginButton = document.getElementById("login-button");
let logoutButton = document.getElementById("logout-button");
let submitButton = document.getElementById("submit-button");
submitButton.disabled = true;

let signupForm = document.getElementById("signup-form");
let emailSignUp = document.getElementById("signup-email");
let passwordSignUp = document.getElementById("signup-password");
let nameSignUp = document.getElementById("signup-name");

let loginForm = document.getElementById("login-form");
let emailLogIn = document.getElementById("login-email");
let passwordLogIn = document.getElementById("login-password");


// ------------------------------- Check Auth -------------------------------
document.addEventListener("DOMContentLoaded", function(){
    let = storageAuthToken = localStorage.getItem("authToken");
    checkAuth(storageAuthToken);
})


function checkAuth(storageAuthToken){

    if (storageAuthToken) {
        let userName = localStorage.getItem("userName"); 
        if (userName) {
            showUserView();
            welcomeMessage.innerText = "Welcome " + userName;
        }
    }
}


// ------------------------------- Signup -------------------------------
signupForm.addEventListener("submit", function(event){
    signup();
    showLogIn();
    event.preventDefault();
})

function signup() {

    let User = createUser();
    let users;
    let usersString = localStorage.getItem("users");

    if(!usersString){
        users = [User];
    }
    else{
        users = JSON.parse(usersString);
        users.push(User);
    }

    usersString = JSON.stringify(users);
    localStorage.setItem("users",usersString);
    alert("Account created successfully ✅");

    validPassword = false;
    validName = false;
}


function createUser(){
    return {
        Email: emailSignUp.value,
        Password: passwordSignUp.value,
        Name: nameSignUp.value
    }
}

passwordSignUp.addEventListener('input', function() {

    passwordSignUp.value = passwordSignUp.value.trim();

    if(passwordSignUp.value.length < 8){
        submitButton.disabled = true;
        validPassword = false;
    }
    else{
        validPassword = true;
    }

});


nameSignUp.addEventListener('input', function() {
    
    nameSignUp.value = nameSignUp.value.trim();

    if(nameSignUp.value.length < 4){
        submitButton.disabled = true;
        validName = false;
    }else{
        validName = true;
    }
    
});

function validSignUp(){
    if(validPassword && validName){
        submitButton.disabled = false;
    }
}
setInterval(validSignUp, 100);


function checkDisability(){
    if(submitButton.disabled == false){
        submitButton.style.backgroundColor = "rgb(66, 141, 255)";
    }else{
        submitButton.style.backgroundColor = "rgb(136, 183, 253)";
    }
}
setInterval(checkDisability, 100);

// ------------------------------- Login -------------------------------
loginForm.addEventListener("submit", function(event){
    event.preventDefault();
    login();
})


function login(){

    let usersString = localStorage.getItem("users");

    if(usersString){

    let users = JSON.parse(usersString);

    users.forEach(user => {
        if(user.Email === emailLogIn.value && user.Password === passwordLogIn.value){

            let authToken = generateAuthToken();
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("userName", user.Name);

            showUserView();
            welcomeMessage.innerText = "Welcome " + user.Name;
        }
        
    });

    }else{
        alert("User Doesn't exist");
    } 
    
}

function generateAuthToken(){
    let authToken = "";
    for(let i=0; i<10;i++){
        authToken += Math.floor(Math.random() *10);
    }
    return authToken;
}

// ------------------------------- Views -------------------------------
function showUserView(){
    signupForm.style.display = "none";
    loginForm.style.display = "none";
    home.style.display = "none";
    userView.style.display = "flex";
}

function showHome(){
    signupForm.style.display = "none";
    loginForm.style.display = "none";
    home.style.display = "flex";
    userView.style.display = "none";
}


function showLogIn(){
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
    home.style.display = "none";
    userView.style.display = "none";
}

function showSignUp(){
    signupForm.style.display = "flex";
    loginForm.style.display = "none";
    home.style.display = "none";
    userView.style.display = "none";
}

logoutButton.addEventListener("click",function(){
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    showHome();
})


signupButton.addEventListener("click", function(){
   showSignUp();
})


loginButton.addEventListener("click", function(){
    showLogIn();
})