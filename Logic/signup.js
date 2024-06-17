let signupForm = document.querySelector("#signup-form");
let email = signupForm.querySelector("#email");
let password = signupForm.querySelector("#password");
let name = signupForm.querySelector("#name");
let submitButton = document.querySelector("#submit-button");

let User = {
    Email: "none",
    Password: "none",
    Name: "none"
}
let users = [];
let usersString;

export function signup() {

    usersString = localStorage.getItem("users");
    User = createUser();

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
    emptyInputs();
}

signupForm.addEventListener("submit", function(event){
    signup();
    event.preventDefault();
})

function createUser(){

    return {
        Email: email.value,
        Password: password.value,
        Name: name.value
    }
}

function emptyInputs(){
    email.value = "";
    password.value = "";
    name.value = "";
}

function trimSpaces(input,minLimit) {

    input.value = input.value.trim();
    
    if(input.value.length < minLimit){
        submitButton.disabled = true;
    }
    else{
        submitButton.disabled = false;
    }
}

email.addEventListener('input', function() {
    trimSpaces(email,20);
});
password.addEventListener('input', function() {
    trimSpaces(password,8);
});
name.addEventListener('input', function() {
    trimSpaces(name,4);
});