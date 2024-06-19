let storageAuthToken = localStorage.getItem("authToken");

document.addEventListener("DOMContentLoaded", function(){
    checkAuth();
})


function checkAuth(){
    if (storageAuthToken) {
        let userName = localStorage.getItem("userName"); 
        if (userName) {
            welcomeMessage.innerText = "Welcome " + userName;
            showUserView();
        } else {
            localStorage.setItem("authToken", "");
        }
    } else {
        localStorage.setItem("authToken", "")
    }
}


function showUserView(){
    signupForm.style.display = "none";
    loginForm.style.display = "none";
    home.style.display = "none";
    userView.style.display = "flex";
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ELEMENTS
let home = document.getElementById("section-1");
let userView = document.getElementById("section-4");

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

let welcomeMessage = document.getElementById("welcome-message");

let users = [];


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SIGNUP
let validatePassword = false;
let validateName = false;

signupForm.addEventListener("submit", function(event){
    signup();
    validatePassword = false;
    validateName = false;
    event.preventDefault();
})

function signup() {

    let usersString = localStorage.getItem("users");
    let User = createUser();

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
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
    home.style.display = "none";
    userView.style.display = "none";
}


function createUser(){

    return {
        Email: emailSignUp.value,
        Password: passwordSignUp.value,
        Name: nameSignUp.value
    }
}

function emptyInputs(){
    emailSignUp.value = "";
    passwordSignUp.value = "";
    nameSignUp.value = "";
}


passwordSignUp.addEventListener('input', function() {

    passwordSignUp.value = passwordSignUp.value.trim();

    if(passwordSignUp.value.length < 8){
        submitButton.disabled = true;
    }
    else{
        validatePassword = true;
    }
    

});


nameSignUp.addEventListener('input', function() {
    
    nameSignUp.value = nameSignUp.value.trim();

    if(nameSignUp.value.length < 4){
        submitButton.disabled = true;
    }else{
        validateName = true;
    }
    
});

function validSignUp(){
    if(validatePassword && validateName){
        submitButton.disabled = false;
    }
}

setInterval(validSignUp, 1000);
setInterval(checkDisability, 1000);

function checkDisability(){
    if(submitButton.disabled == false){
        submitButton.style.backgroundColor = "rgb(66, 141, 255)";
    }else{
        submitButton.style.backgroundColor = "rgb(136, 183, 253)";
    }
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
loginForm.addEventListener("submit", function(event){
    login();
    event.preventDefault();
})


function login(){

    let usersString = localStorage.getItem("users");
    let users = JSON.parse(usersString);
    let userName;

    if(users){
    users.forEach(user => {
        if(user.Email === emailLogIn.value && user.Password === passwordLogIn.value){

            let authToken = generateAuthToken();
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("userName", user.Name);

            signupForm.style.display = "none";
            loginForm.style.display = "none";
            home.style.display = "none";
            userView.style.display = "flex";
            userName = user.Name;
            welcomeMessage.innerText = "Welcome " + userName;

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

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
logoutButton.addEventListener("click",function(){
    localStorage.setItem("authToken", "")
    localStorage.setItem("userName", "");
    signupForm.style.display = "none";
    loginForm.style.display = "none";
    home.style.display = "flex";
    userView.style.display = "none";
})


signupButton.addEventListener("click", function(){
    signupForm.style.display = "flex";
    loginForm.style.display = "none";
    home.style.display = "none";
    userView.style.display = "none";
})


loginButton.addEventListener("click", function(){
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
    home.style.display = "none";
    userView.style.display = "none";
})

